# Generated by Django 4.2.6 on 2023-11-06 06:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0002_remove_restaurant_user_restaurant_restaurant_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurant',
            name='restaurant_id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]
