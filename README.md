# Content Control Dashboard React app

This is a frontend application built with React and TypeScript, providing a modern and responsive UI for managing content access policies, user sessions, support requests, and traffic monitoring. It integrates with a [SpringBoot app](https://github.com/mantonic002/kliksigurnost) that uses Cloudflare Zero Trust API to offer secure and flexible content blocking in the background.


## 🚀 Features:

- Unauthenticated users:

  - Front page with quick overview
  ![1](https://github.com/user-attachments/assets/c749ea7a-da3c-46cb-b240-55a2602c23c6)
  ![2](https://github.com/user-attachments/assets/ed1f0c7e-6029-463e-b61d-7bf2cd09c38f)
  ![3](https://github.com/user-attachments/assets/d2d6c70f-71dd-44c1-8b33-129f43a865b7)

  - Professional advice
  ![profesional advice](https://github.com/user-attachments/assets/48a28713-7d8d-4799-a871-62867cb10fbf)

  - Instructions
  ![directions](https://github.com/user-attachments/assets/172d45fa-a4a3-4569-829b-8ce5e146a591)

  - Login & Register forms with OAuth2
  ![login](https://github.com/user-attachments/assets/db141df2-e6ca-4314-bae7-28b58c98f7ab)
  ![reg](https://github.com/user-attachments/assets/ddf4c971-d54a-472e-9dea-82e51153f6fb)


- Authenticated users:
  - Policy page (CREATE, READ, DELETE)
  ![policies](https://github.com/user-attachments/assets/8df8600c-29bd-43a5-94be-73eb9de00520)
  ![policy details](https://github.com/user-attachments/assets/1b2a37d2-51ac-4ae5-ad7e-697132a0f6a7)
  ![policy form](https://github.com/user-attachments/assets/46973847-9b29-4631-9e84-f443d573ff50)
  ![policy form2](https://github.com/user-attachments/assets/ffa36875-300a-4c11-a451-04a28b6e3881)
  ![schedule](https://github.com/user-attachments/assets/62a8e33e-035a-41fc-8ab7-03e9f574647f)
  ![schedule2](https://github.com/user-attachments/assets/c10e0c2c-e15b-459a-9846-b3bea6560453)

  - Traffic logs (Monitor blocked and allowed traffic events in real-time)
  ![logs](https://github.com/user-attachments/assets/920a6acb-ef81-440f-a251-a1c5f9c0ca88)
  ![logs2](https://github.com/user-attachments/assets/d2efbd34-0b72-461c-abfc-d1e01f9e22e3)
  ![logs3](https://github.com/user-attachments/assets/947eba29-66a0-4b94-98b3-585fe85ddf1f)

  - Connected devices
  ![devices](https://github.com/user-attachments/assets/74ee59a1-d4e8-418f-8d58-f7ecbc2c0589)

  - Support page
  ![support](https://github.com/user-attachments/assets/d18b8936-2f02-468e-9521-9ccff50ed3a7)
  ![support2](https://github.com/user-attachments/assets/75e919e6-f0cd-42c7-adcb-38b67df34334)

  - Notifications on Device disconnect and attempt to access blocked content
  ![notifications](https://github.com/user-attachments/assets/7d550329-2086-46ed-b967-a577d47a47ae)

  - Navigation sidebar
  ![navbar](https://github.com/user-attachments/assets/ca1a0018-9f10-4cd1-bfe2-36d3c24798a2)


- Admin dashboard
![admin2](https://github.com/user-attachments/assets/44311379-0f5a-48d5-b175-766dbad647d9)
![admin1](https://github.com/user-attachments/assets/16ce3d1b-7e6b-48f2-9e31-b02a5a3139a1)
![admin](https://github.com/user-attachments/assets/e745717d-0068-486a-ba51-61658283eb25)
![admin3](https://github.com/user-attachments/assets/8a5947f5-267f-4323-b2c2-93bfe1af0859)
![admin4](https://github.com/user-attachments/assets/b2d85575-bc47-4e6d-9cfd-8a0efd70c160)

## 📦 Project Setup:
```
npm install
npm run dev
```

