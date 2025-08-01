import PusherServer from "pusher";

import PusherClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
  key: process.env.NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY as string,
  secret: process.env.PUSHER_SECRET_KEY as string,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY as string,
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  }
);