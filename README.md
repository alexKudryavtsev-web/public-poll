# Public Polls

**_Public polls_**. This is a service for conducting sociological surveys. In it, you can create questionnaires and receive data with them. The closest analogue is Yandex Form.

Usage logic:

- The user creates a questionnaire from two available elements: the choice of one value and text input.
- The user receives a link through which you can go and answer all the questions posed in the questionnaire. He distributes it.
- Outsiders go through the link and do it. To prevent one person from answering the same form multiple times, they must enter their email address.
- After some time, the user can stop the survey and get data for analysis.

**_Модели БД:_**

1. User
2. Poll
3. Reply
4. Refresh Token
5. Reset Password Token

**_API:_**

1. Auth
2. Poll
3. Reply

**_Stack (Backend):_**

- Express
- Mongoose

**_Stack (Fronted):_**

- React + hooks
