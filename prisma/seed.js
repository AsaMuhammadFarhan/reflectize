import { PrismaClient } from "@prisma/client";
import { hash } from "argon2";

const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({
    where: {
      email: "frost.75.asafarhan@gmail.com",
    },
    update: {
      username: "reflectize",
      password: await hash("reflectize123"),
    },
    create: {
      email: "frost.75.asafarhan@gmail.com",
      username: "admin",
      name: "Admin",
      password: await hash("admin"),
      role: "ADMIN",
    },
  });
  if (admin) console.log(`${admin.name} updated`);

  const topic1 = await prisma.topic.upsert({
    where: {
      slug: "ronaldo-atau-messi",
    },
    create: {
      slug: "ronaldo-atau-messi",
      title: "Ronaldo atau Messi?",
      preferPublication: true,
      publishedAt: new Date(),
      createdById: admin.id,
    },
    update: {
      description: "Preferensi untuk lebih baik mendukung Ronaldo atau Messi.",
    },
  });
  if (topic1) console.log(`${topic1.slug} exist`);
  const countQuestions1 = await prisma.question.count({
    where: {
      topicId: topic1.id,
    },
  });
  if (countQuestions1 === 0) {
    const questions1 = [
      "Apakah kamu suka pemain yang menunjukkan kerja keras dan disiplin sebagai kunci kesuksesan?",
      "Apakah kamu lebih tertarik pada pemain yang punya gaya bermain kreatif dan penuh improvisasi?",
      "Apakah kamu kagum dengan pemain yang sering mencetak gol dari situasi sulit atau tak terduga?",
      "Apakah kamu lebih menghargai pemain yang terus berusaha meskipun menghadapi banyak kritik?",
      "Apakah kamu suka pemain yang terlihat tenang dan tidak terlalu menunjukkan emosinya di lapangan?",
      "Apakah kamu lebih suka pemain yang memiliki fisik kuat dan kecepatan tinggi?",
      "Apakah kamu tertarik pada pemain yang lebih banyak berkontribusi lewat assist dan visi permainan?",
      "Apakah kamu lebih suka pemain yang sering tampil percaya diri di luar maupun di dalam lapangan?",
      "Apakah kamu menghargai pemain yang setia bermain untuk satu klub dalam waktu lama?",
      "Apakah kamu lebih suka pemain yang sering tampil sebagai pemimpin yang vokal di timnya?",
    ];
    let order = 1;
    for (const question of questions1) {
      const created = await prisma.question.create({
        data: {
          order,
          question,
          topicId: topic1.id,
        },
      });
      order++;
      if (created) console.log(`topic1 question created`);
    }
  }

  const topic2 = await prisma.topic.upsert({
    where: {
      slug: "cewe-manja-atau-alpha",
    },
    create: {
      slug: "cewe-manja-atau-alpha",
      title: "Suka Cewe Manja atau Alpha?",
      preferPublication: true,
      publishedAt: new Date(),
      createdById: admin.id,
    },
    update: {},
  });
  if (topic2) console.log(`${topic2.slug} exist`);
  const countQuestions2 = await prisma.question.count({
    where: {
      topicId: topic2.id,
    },
  });
  if (countQuestions2 === 0) {
    const questions2 = [
      "Apakah Anda merasa nyaman ketika pasangan Anda meminta bantuan untuk hal-hal kecil yang sebenarnya bisa mereka lakukan sendiri?",
      "Apakah Anda tertarik pada seseorang yang mengambil inisiatif dalam membuat keputusan penting dalam hubungan?",
      "Apakah Anda merasa senang ketika pasangan menunjukkan ketergantungan emosional pada Anda?",
      "Apakah Anda lebih suka jika pasangan Anda memiliki sikap dominan dalam perencanaan aktivitas bersama?",
      "Apakah Anda menikmati peran sebagai pelindung atau orang yang diandalkan dalam hubungan?",
      "Apakah Anda merasa tertarik pada pasangan yang memiliki ambisi besar dan kepercayaan diri tinggi?",
      "Apakah Anda lebih suka pasangan yang sering meminta pendapat Anda sebelum mengambil keputusan, bahkan untuk hal-hal kecil?",
      "Apakah Anda mengagumi pasangan yang bisa mengambil alih situasi saat ada masalah tanpa perlu banyak berdiskusi?",
      "Apakah Anda merasa lebih terhubung secara emosional dengan pasangan yang sering mencari perhatian dari Anda?",
      "Apakah Anda tertarik pada pasangan yang bisa menjaga kemandirian mereka tanpa terlalu mengandalkan orang lain?",
    ];
    let order = 1;
    for (const question of questions2) {
      const created = await prisma.question.create({
        data: {
          order,
          question,
          topicId: topic2.id,
        },
      });
      order++;
      if (created) console.log(`topic2 question created`);
    }
  }

  const topic3 = await prisma.topic.upsert({
    where: {
      slug: "liburan-ke-gunung-atau-pantai",
    },
    create: {
      slug: "liburan-ke-gunung-atau-pantai",
      title: "Liburan ke Gunung atau Pantai?",
      description:
        "Di gunung sejuk, bisa barbeque-an, bisa menghirup udara segar. Di sisi lain ke pantai seru, bisa lihat pemandangan pesisir. Kira-kira aku lebih suka yang mana ya?",
      likedByIds: [admin.id],
      preferPublication: true,
      publishedAt: new Date(),
      createdById: admin.id,
    },
    update: {
      description:
        "Di gunung sejuk, bisa barbeque-an, bisa menghirup udara segar. Di sisi lain ke pantai seru, bisa lihat pemandangan pesisir. Kira-kira aku lebih suka yang mana ya?",
    },
  });
  if (topic3) console.log(`${topic3.slug} exist`);
  const countQuestions3 = await prisma.question.count({
    where: {
      topicId: topic3.id,
    },
  });
  if (countQuestions3 === 0) {
    const questions3 = [
      "Apakah kamu suka menikmati pemandangan alam yang luas dan terbuka?",
      "Apakah kamu merasa lebih rileks saat mendengar suara ombak atau air mengalir?",
      "Apakah kamu senang berjalan kaki atau hiking di tempat yang menanjak?",
      "Apakah kamu lebih suka cuaca yang hangat dan berangin daripada dingin dan sejuk?",
      "Apakah kamu menikmati suasana tenang dan jauh dari keramaian saat liburan?",
      "Apakah kamu suka merasakan pasir di kaki saat berjalan santai?",
      "Apakah kamu merasa puas saat mencapai puncak setelah mendaki?",
      "Apakah kamu lebih suka menghabiskan waktu dengan berjemur atau berenang?",
      "Apakah kamu menikmati udara segar yang dingin di pagi hari?",
      "Apakah kamu lebih suka menyaksikan matahari terbit dari ketinggian daripada dari tepi laut?",
    ];
    let order = 1;
    for (const question of questions3) {
      const created = await prisma.question.create({
        data: {
          order,
          question,
          topicId: topic3.id,
        },
      });
      order++;
      if (created) console.log(`topic3 question created`);
    }
  }
  const topic4 = await prisma.topic.upsert({
    where: {
      slug: "kalau-aku-adalah-buah-aku-buah-apa",
    },
    create: {
      slug: "kalau-aku-adalah-buah-aku-buah-apa",
      title: "Kalau aku adalah buah, aku buah apa?",
      description:
        "Penyihir mengutukmu menjadi buah sesuai dengan kepribadianmu. Tebak, kamu menjadi buah apa?",
      likedByIds: [],
      preferPublication: true,
      publishedAt: new Date(),
      createdById: admin.id,
    },
    update: {},
  });
  if (topic4) console.log(`${topic4.slug} exist`);
  const countQuestions4 = await prisma.question.count({
    where: {
      topicId: topic4.id,
    },
  });
  if (countQuestions4 === 0) {
    const questions4 = [
      "Apakah kamu lebih suka berada di lingkungan yang ramai dan penuh aktivitas?",
      "Apakah kamu merasa nyaman jadi pusat perhatian di antara teman-temanmu?",
      "Apakah kamu lebih suka hal-hal yang sederhana tapi punya makna mendalam?",
      "Apakah kamu cenderung mudah beradaptasi dengan situasi baru?",
      "Apakah kamu suka tantangan dan mencoba hal-hal yang belum pernah kamu lakukan sebelumnya?",
      "Apakah kamu lebih suka sesuatu yang manis daripada yang asam atau pahit?",
      "Apakah kamu merasa puas ketika bisa membantu orang lain merasa lebih baik?",
      "Apakah kamu lebih suka suasana santai daripada yang terlalu formal?",
      "Apakah kamu sering dianggap orang yang ceria dan mudah bergaul?",
      "Apakah kamu merasa lebih nyaman ketika segalanya berjalan sesuai rencana daripada tiba-tiba berubah?",
    ];
    let order = 1;
    for (const question of questions4) {
      const created = await prisma.question.create({
        data: {
          order,
          question,
          topicId: topic4.id,
        },
      });
      order++;
      if (created) console.log(`topic4 question created`);
    }
  }

  const topic5 = await prisma.topic.upsert({
    where: {
      slug: "apa-karakterku-berdasarkan-trivia-islam",
    },
    create: {
      slug: "apa-karakterku-berdasarkan-trivia-islam",
      title: "Apa Karakterku Berdasarkan Trivia Islam?",
      description:
        "Trivia, pilih A atau B? Games menarik yang bisa kalian coba, sekaligus dapat mengenali diri kalian lebih dalam.",
      likedByIds: [],
      preferPublication: true,
      publishedAt: new Date(),
      createdById: admin.id,
    },
    update: {},
  });
  if (topic5) console.log(`${topic5.slug} exist`);
  const countQuestions5 = await prisma.question.count({
    where: {
      topicId: topic5.id,
    },
  });
  if (countQuestions5 === 0) {
    const questions5 = [
      {
        question: "Abu Bakar atau Umar?",
        options: ["Abu Bakar", "Umar"],
      },
      {
        question: "Ali atau Utsman?",
        options: ["Ali", "Utsman"],
      },
      {
        question: "Sedekah uang atau sedekah tenaga?",
        options: ["Uang", "Tenaga"],
      },
      {
        question: "Sholat Dhuha atau Sholat Tahajud?",
        options: ["Dhuha", "Tahajud"],
      },
      {
        question: "Membaca Al-Qur'an atau memahami tafsirnya?",
        options: ["Membaca", "Memahami"],
      },
      {
        question: "Mendengarkan ceramah atau berdiskusi langsung?",
        options: ["Ceramah", "Diskusi"],
      },
      {
        question: "Sabar dalam musibah atau syukur dalam nikmat?",
        options: ["Sabar", "Syukur"],
      },
      {
        question: "Berdoa sendiri atau minta didoakan?",
        options: ["Berdoa sendiri", "Minta didoakan"],
      },
      {
        question: "Ilmu Fiqh atau Ilmu Akhlak?",
        options: ["Ilmu Fiqh", "Ilmu Akhlak"],
      },
      {
        question: "Berdakwah dengan tindakan atau dengan ucapan?",
        options: ["Tindakan", "Ucapan"],
      },
    ];
    let order = 1;
    for (const question of questions5) {
      const created = await prisma.question.create({
        data: {
          order,
          question: question.question,
          options: question.options,
          topicId: topic5.id,
        },
      });
      order++;
      if (created) console.log(`topic5 question created`);
    }
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
