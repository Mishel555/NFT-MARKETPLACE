import { IMemberBenefit } from '@constants/types';
import { MemberBenefitCard } from '@components/molecules';
import members_coll from '@assets/images/members/members_coll.png';
import members_gallery from '@assets/images/members/members_gallery.png';
import members_create from '@assets/images/members/members_create.png';

import styles from './style.module.scss';

const BENEFITS: IMemberBenefit[] = [
  {
    title: 'Get your gallery space',
    description: `Once a member, you’ll automatically get your own tech-equipped gallery space in the heart of Dubai. 
    Access this new market, showcase your digital collection and start creating 5th-sensory immersive experiences 
    in real life – without the expenses.`,
    src: members_gallery,
  },
  {
    title: 'Collaborate in one platform',
    description: `Let us handle all your logistics from A–Z. Access our platform to easily manage your artists, 
    organize onboarding processes, create smart contracts, and seamlessly sell digital works of art.`,
    src: members_coll,
  },
  {
    title: 'Create unique experiences',
    description: `Start tapping into our next-generation technology that enables art to fully come to life. Be part 
    of the art disruption that transforms works of art into completely immersive, new experiences that resonate within 
    all 5 senses.`,
    src: members_create,
  },
];

const BenefitSection = () => (
  <section className={styles.root}>
    <h1 className={styles.root__title}>Membership Benefits</h1>
    <p className={styles.root__subTitle}>Explore all the benefits that Art in Space has to offer our exclusive members.</p>
    <div className={styles.root__wrapper}>
      {BENEFITS.map((benefit, index) => (
        <MemberBenefitCard key={index} data={benefit} rtl={index % 2 !== 0} />
      ))}
    </div>
  </section>
);

export default BenefitSection;
