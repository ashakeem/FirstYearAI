# Generated by Django 5.1.6 on 2025-02-17 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roadmap',
            name='content',
            field=models.JSONField(blank=True, null=True),
        ),
    ]
