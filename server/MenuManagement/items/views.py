from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Item
from .serializers import ItemSerializer
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope, TokenHasScope
from rest_framework.permissions import IsAuthenticated
from media.models import Media
from django.contrib.contenttypes.models import ContentType
from django.conf import settings
import os
from rest_framework.parsers import MultiPartParser, FormParser


class ItemList(APIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            new_item = Item(
                name=request.data['name'],
                description=request.data['description']
            )
            new_item.save()

            uploaded_image = request.data.get('image')

            if uploaded_image:
                # Save the uploaded image to your media storage
                media_instance = Media.objects.create(
                    content_type=ContentType.objects.get_for_model(new_item),
                    object_id=new_item.id,
                    image=uploaded_image,
                    description="Image for the item",
                    entity_type='item',
                    file_type='image'
                )

                new_item.image = media_instance.pk  # Pass the pk of the associated media
                new_item.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ItemDetail(APIView):
    permission_classes = [IsAuthenticated, TokenHasReadWriteScope]

    def get_object(self, pk):
        try:
            return Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        item = self.get_object(pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    def put(self, request, pk):
        item = self.get_object(pk)
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        item = self.get_object(pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
