import { formatNumber } from "@/utils/formatNumber";
import Image from "next/image";

import styles from "@/styles/Home.module.scss";
import { Product } from "@/mock/preduct";
import { MercadoPagoButton } from "@/components/MercadoPagoButton";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.productContainer}>
        <Image
          src={Product.img}
          alt={Product.title}
          width={360}
          height={450}
          priority
        />

        <div className={styles.data}>
          <div className={styles.top}>
            <h2>{Product.title}</h2>
            <h3>{formatNumber(Product.price)}</h3>
          </div>

          <div className={styles.center}>
            <span>Lo que tenes que saber de este producto:</span>

            <ul>
              {Product.description.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <MercadoPagoButton product={Product} />
          </div>
        </div>
      </div>

      <div className={styles.notification}>
        <div className={styles.iconContainer}></div>
      </div>
    </main>
  );
}
