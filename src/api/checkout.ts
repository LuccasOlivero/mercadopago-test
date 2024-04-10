import { NextApiRequest, NextApiResponse } from "next";
import { MercadoPagoConfig, Preference } from "mercadopago";
import { IProduct } from "@/mock/preduct";

const client = new MercadoPagoConfig({
  accessToken: process.env.NEXT_ACCESS_TOKEN!,
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const preference = new Preference(client);

  if (req.method === "POST") {
    const product: IProduct = req.body.product;

    const URL = "http://localhost:3000";

    try {
      const response = await preference.create({
        body: {
          items: [
            {
              id: "test",
              title: product.title,
              unit_price: product.price,
              quantity: 1,
            },
          ],

          auto_return: "approved",
          back_urls: {
            success: `${URL}`,
            failure: `${URL}`,
          },
          notification_url: `${URL}/api/notify`,
        },
      });

      res.status(200).send({ url: response.sandbox_init_point });
    } catch (error) {}
  } else {
    res.status(400).json({ message: "Method not allowed" });
  }
};

export default handler;
