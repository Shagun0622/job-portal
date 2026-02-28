import { Webhook } from "svix";
import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {
  try {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const event = wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = event;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          name: `${data.first_name || ""} ${data.last_name || ""}`,
          email: data.email_addresses[0]?.email_address,
          image: data.image_url,
          resume:''
        };

        await User.create(userData);
        break;
      }

      case "user.updated": {
        await User.findByIdAndUpdate(data.id, {
          name: `${data.first_name || ""} ${data.last_name || ""}`,
          email: data.email_addresses[0]?.email_address,
          image: data.image_url,
        });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        console.log("Unhandled Clerk event:", type);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Clerk Webhook Error:", error.message);
    res.status(400).json({ success: false });
  }
};

export default clerkWebhooks;
