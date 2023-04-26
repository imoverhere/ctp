import json
from .models import Contact 
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Contact
from django.db import connection
from custom_logger import log_message


def contacts(request, id=None):
    if request.method == "GET":
        if id:
            # Retrieve a specific contact by id
            try:
                contact = Contact.objects.get(id=id)
                data = {
                    "id": contact.id, 
                    "first_name": contact.first_name, 
                    "last_name": contact.last_name, 
                    "email": contact.email, 
                    "phone_number": contact.phone_number,
                    "address" : contact.address
                    }

                log_message('Get specific Contact by ID', 'INFO')
                log_message(f"SQL Queries: {connection.queries[-1]['sql']}", "DEBUG")
                return JsonResponse({"status": "success", "data": data})

            except Contact.DoesNotExist:
                return JsonResponse({"status": "error", "message": f"Contact with id {id} does not exist"})
        else:
            # Retrieve all contacts
            contacts = Contact.objects.filter(owner=request.GET.get('username', None))
            data = [
                {
                    "id": contact.id, 
                    "first_name": contact.first_name, 
                    "last_name": contact.last_name, 
                    "email": contact.email, 
                    "phone_number": contact.phone_number,
                    "address" : contact.address
                    } for contact in contacts]
            log_message('Get all contacts for a user', 'INFO')
            log_message(f"SQL Queries: {connection.queries[-1]['sql']}", "DEBUG")
            return JsonResponse({"status": "success", "data": data, "username": request.GET.get('username')})


    elif request.method == "POST":
        # Create a new contact
        try:
            data = json.loads(request.body)
            contact = Contact.objects.create(first_name=data["first_name"], last_name =data["last_name"], email=data["email"], phone_number=data["phone_number"], owner=data["username"], address=data["address"])
            
            log_message('Create a new contact', 'INFO')
            log_message(f"SQL Queries: {connection.queries[-1]['sql']}", "DEBUG")
            
            return JsonResponse({"status": "success", "message": f"Contact with id {contact.id} created successfully"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)})


    elif request.method == "PUT":
        # Update an existing contact by id
        try:
            data = json.loads(request.body)
            contact = Contact.objects.get(id=id)
            contact.first_name = data["name"]
            contact.last_name = data["last_name"]
            contact.email = data["email"]
            contact.phone_number = data["phone"]
            contact.address = data.get("address")
            contact.save()

            log_message('Update a specific Contact by ID', 'INFO')
            log_message(f"SQL Queries: {connection.queries[-1]['sql']}", "DEBUG")

            return JsonResponse({"status": "success", "message": f"Contact with id {id} updated successfully"})
        except Contact.DoesNotExist:
            return JsonResponse({"status": "error", "message": f"Contact with id {id} does not exist"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)})



    elif request.method == "DELETE":
        # Delete a specific contact by id
        try:
            contact = Contact.objects.get(id=id)
            contact.delete()

            log_message('Delete a specific Contact by ID', 'INFO')
            log_message(f"SQL Queries: {connection.queries[-1]['sql']}", "DEBUG")

            return JsonResponse({"status": "success", "message": f"Contact with id {id} deleted successfully"})
        except Contact.DoesNotExist:
            return JsonResponse({"status": "error", "message": f"Contact with id {id} does not exist"})
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)})
