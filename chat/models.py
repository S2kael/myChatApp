# myapp/models.py

import uuid
import time_uuid
import time
from cassandra.cqlengine import columns
from django_cassandra_engine.models import DjangoCassandraModel
from datetime import datetime



class GroupMessage(DjangoCassandraModel):
    groupid = columns.Integer(partition_key=True)
    id = columns.Integer(primary_key=True)
    author = columns.Integer()
    content = columns.Text(required=True)
    attach = columns.Text()
    image = columns.Text()
    available = columns.Boolean()
    created_at = columns.DateTime(default=datetime.now())
    updated_at = columns.DateTime()
    class Meta:
        get_pk_field = 'groupid'

    def __str__(self):
        return self.author

    @staticmethod
    def last_30_messages(groupid):
        return GroupMessage.objects.filter(groupid=groupid).order_by('-id')[:30]
