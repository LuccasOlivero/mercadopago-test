import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-7170199304811197-040812-3ec8f2af924f47e372adb1101279a114-553205050",
});

export default async function Home() {
  async function donate(formData: FormData) {
    "use server";

    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            id: "donacion",
            title: "22",
            quantity: 1,
            unit_price: 999,
          },
        ],
      },
    });

    redirect(preference.sandbox_init_point!);
  }

  return (
    <section className="dark container m-auto grid min-h-screen grid-rows-[auto,1fr,auto] bg-background px-4 font-sans antialiased">
      <header className="text-xl font-bold leading-[4rem]">
        stream-donancy
      </header>
      <main className="py-8">
        <section className="grid gap-12">
          <form
            action={donate}
            className="m-auto grid max-w-96 gap-8 border p-4 text-black"
          >
            <label className="grid gap-2">
              <span>Valor</span>
              <input name="amount" type="number" />
            </label>
            <button type="submit" className="text-white">
              Enviar
            </button>
          </form>
        </section>
      </main>
      <footer className="text-center leading-[4rem] opacity-70">
        © {new Date().getFullYear()} stream-donancy
      </footer>
    </section>
  );
}
