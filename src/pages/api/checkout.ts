import { NextApiRequest, NextApiResponse } from "next";
import { MercadoPagoConfig, Preference } from "mercadopago";

export const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://coffee-mp-app.vercel.app";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const client = new MercadoPagoConfig({
        accessToken: process.env.NEXT_ACCESS_TOKEN!,
      });
      const amount = req.body.amount;
      const itemId = amount.toString();
      const preference = new Preference(client);
      const response = await preference.create({
        body: {
          items: [
            {
              id: itemId,
              title: "Cafecito",
              quantity: 1,
              unit_price: amount,
            },
          ],
          back_urls: {
            success: `${URL}/success`,
          },
        },
      });
      res.status(200).send({ url: response.init_point });
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

export default handler;
