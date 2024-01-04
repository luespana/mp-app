import { NextApiRequest, NextApiResponse } from "next";
import { MercadoPagoConfig, Preference } from "mercadopago";

export const URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://mp-app-gules.vercel.app";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body;
    console.log(body);

    try {
      const client = new MercadoPagoConfig({
        accessToken: process.env.NEXT_ACCESS_TOKEN!,
      });
      const preference = new Preference(client);
      const response = await preference.create({
        body: {
          items: [
            {
              id: "hola",
              title: "Cafecito",
              quantity: 1,
              unit_price: body.amount,
            },
          ],
          back_urls: {
            success: URL,
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
