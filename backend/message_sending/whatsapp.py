from twilio.rest import Client

def whatsapp_message(message_body):
    account_sid = 'AC26868835e8be92e55cbe969f2f629c4f'
    auth_token = '572d03764a4de3d20aadc845d23b640b'
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        from_='whatsapp:+14155238886',
        body=message_body,
        to='whatsapp:+919028758349'
    )
    
    return "success"
    
    

