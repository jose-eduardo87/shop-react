import { PageLayout } from "components/common/index";
import {
  CreditCard,
  ExclamationMark,
  Secure,
  Truck,
} from "components/icons/index";

import styles from "./PaymentInfo.module.css";

const sectionStyles = {
  root: {
    backgroundColor: "#F9F9F9",
  },
  container: {
    width: "65%",
    margin: "0 auto",
    padding: "4rem",
  },
};

const iconStyles = {
  width: 36,
  height: 36,
  fill: "#000",
};

const PaymentInfo = () => {
  return (
    <PageLayout CSSProps={{ ...sectionStyles }}>
      <div className={styles.paymentContainer}>
        <div className={styles.informationBox}>
          <Truck {...iconStyles} />
          <div>
            <p className={styles.title}>Fast shipping</p>
            <p className={styles.additionalInfo}>Up to 10 business days!</p>
          </div>
        </div>
        <div className={styles.informationBox}>
          <CreditCard {...iconStyles} />
          <div>
            <p className={styles.title}>Up to 6x.</p>
            <p className={styles.additionalInfo}>
              No additional fees. No fluff.
            </p>
          </div>
        </div>
        <div className={styles.informationBox}>
          <Secure {...iconStyles} />
          <div>
            <p className={styles.title}>Secure.</p>
            <p className={styles.additionalInfo}>
              Your data is taken seriously.
            </p>
          </div>
        </div>
        <div className={styles.informationBox}>
          <ExclamationMark {...iconStyles} />
          <div>
            <p className={styles.title}>Got any questions?</p>
            <p className={styles.additionalInfo}>
              Make sure to read our <a href="/FAQ">FAQ</a>.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentInfo;
