import LogInPage from "../pages/LogInPage.jsx";
import CreateAccountPage from "../pages/CreateAccountPage.jsx";
import ForgotPasswordPage from "../pages/ForgotPasswordPage.jsx";
import SetNewPasswordPage from "../pages/SetNewPasswordPage.jsx";

import Error404Page from "../pages/Error404Page.jsx";
import TakePollPage from "../pages/TakePollPage.jsx";

import ProfilePage from "../pages/ProfilePage.jsx";
import PollDetailsPage from "../pages/PollDetailsPage.jsx";
import CreatePollPage from "../pages/CreatePollPage.jsx";

const PUBLIC_ROUTES = [
  { path: "/", element: <LogInPage /> },
  { path: "login", element: <LogInPage /> },
  { path: "create-account", element: <CreateAccountPage /> },
  { path: "forgot-password", element: <ForgotPasswordPage /> },
  { path: "set-new-password/:link", element: <SetNewPasswordPage /> },
  { path: "polls/:code", element: <TakePollPage /> },
  { path: "*", element: <Error404Page /> },
];

const PRIVATE_ROUTES = [
  { path: "/", element: <ProfilePage /> },
  { path: "poll-details/:id", element: <PollDetailsPage /> },
  { path: "create-poll/", element: <CreatePollPage /> },
  { path: "polls/:code", element: <TakePollPage /> },
  { path: "*", element: <Error404Page /> },
];

export { PUBLIC_ROUTES, PRIVATE_ROUTES };
