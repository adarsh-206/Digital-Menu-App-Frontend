# Generated by Django 4.2.6 on 2023-10-29 09:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_remove_user_confirm_password_user_last_login_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='email',
            field=models.EmailField(default='default@example.com', max_length=254, unique=True),
        ),
    ]
