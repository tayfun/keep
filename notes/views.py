import json

from django.contrib.auth import authenticate, login
# TODO: Remove once Express proxying is turned off.
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from rest_framework import routers, serializers, viewsets
from rest_framework import permissions


from .models import Note


class NoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Note
        fields = ('id', 'word', 'definition', 'context', 'language')


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'notes', NoteViewSet)


@require_POST
@csrf_exempt
def login_api(request):
    post_dict = json.loads(request.body)
    user = authenticate(**post_dict)
    if not user:
        return JsonResponse(
            {'message': 'Username of password incorrect'},
            status=400
        )
    login(request, user)
    return JsonResponse({'message': 'Success'})
