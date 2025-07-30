// import PusherServer from "pusher";
// import Pusher from "pusher-js";

// export const pusherServer = new PusherServer({
//   appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID!,
//   key: process.env.NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY!,
//   secret: process.env.PUSHER_SECRET_KEY!,
//   cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
// });

// export const pusherClient = new Pusher(
//   process.env.NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY!,
//   {
//     cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
//   }
// );

// NEXT_PUBLIC_PUSHER_APP_ID=2025827
// NEXT_PUBLIC_PUSHER_PUBLISHABLE_KEY=c215672b96f9b9805d7f
// PUSHER_SECRET_KEY=c617811ffa516ba33039
// NEXT_PUBLIC_PUSHER_CLUSTER=ap2

import PusherServer from "pusher";
// import Pusher from "pusher-js";
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