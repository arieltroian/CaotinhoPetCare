const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "https://utfs.io/f/8ab3fe5f-493d-4ffa-829b-b570a8f43cb1-x7vfzr.png",
      "https://utfs.io/f/eafea6cb-4c69-443f-98d2-25e8e1d576ab-x7vfvg.png",
      "https://utfs.io/f/c68f7b49-59f8-4755-bb68-41b8dddb9df2-zci0o8.png",
      "https://utfs.io/f/afecf235-dc8e-438b-ab0d-67af4bbdf4bd-a9hgxi..png",
      "https://utfs.io/f/dd433494-ccc0-42d6-908d-6d65a83eb35a-x7vfx6.png",
      "https://utfs.io/f/d92fe342-99bc-426d-a318-2fc7f9b58a1d-x7vfwb.png",
      "https://utfs.io/f/338e53e3-1d00-4509-b816-67bd2a9dbae7-x7vful.png",
      "https://utfs.io/f/86e29433-6279-4aed-b191-f3024740e5da-x7vfy1.png",
      "https://utfs.io/f/b23e87a7-a581-4348-811f-910bb44ca8cf-x7vftq.png",
      "https://utfs.io/f/a2bc225b-9106-4108-8045-40f01436385a-x7vfyw.png",
    ];
    // Nomes dos Pet Shops
    const creativeNames = [
      "Pata Real",
      "Bicharada",
      "PetStyle",
      "Laços e Latidos",
      "Aconchego Pet",
      "Peludos & Cia.",
      "Pet Palace",
      "Mundo Animal Petshop",
      "Clínica Pet Alegria",
      "Mimopet",
    ];

    // Endereços fictícios dos Pet Shops
    const addresses = [
      "Caminho do Arco Celeste, 369",
      "Avenida da Harmonia, 210",
      "Rua das Quatro Estações, 654",
      "Largo das Aventuras, 101",
      "Estrada do Arco Celeste, 789",
      "Rua do Horizonte, 789",
      "Praça das Águas, 567",
      "Estrada da Montanha, 234",
      "Rua Urbana, 606",
      "Avenida da Brisa, 345",
    ];

    const services = [
      {
        name: "Tosa com tesoura",
        description:
          "Técnicas de tosa com tesoura para criar cortes personalizados.",
        price: 90.0,
        imageUrl: "https://i.ibb.co/F3k6v1S/tosa-na-tesoura.jpg",
      },
      {
        name: "Tosa simples",
        description:
          "Tosa eficiente para manter a pelagem do seu pet sempre em ordem .",
        price: 70.0,
        imageUrl: "https://i.ibb.co/bg3Wfpt/devo-tosar-pet-verao-petlove.jpg",
      },
      {
        name: "Tosa higiênica",
        description:
          "Um cuidado essencial para manter seu pet limpo, confortável e saudável.",
        price: 50.0,
        imageUrl: "https://i.ibb.co/KLWDqpv/eqivd1xpn0734c667erc76yjp.jpg",
      },
      {
        name: "Banho",
        description: "Limpa, condiciona e hidrata a pelagem do seu pet.",
        price: 50.0,
        imageUrl: "https://i.ibb.co/W558XP0/foto-04-1024x684.png",
      },
      {
        name: "Banho e tosa completo",
        description:
          "Utilizando produtos de alta qualidade, nossa equipe oferece um banho revitalizante e uma tosa especializada.",
        price: 130.0,
        imageUrl: "https://i.ibb.co/f2JWBF7/tosa-animal.jpg",
      },
      {
        name: "Corte de unhas e Limpeza de ouvidos",
        description: "Adicional do corte das unhas e limpeza dos ouvidos.",
        price: 10.0,
        imageUrl: "https://i.ibb.co/dPSfR5v/php-Thumb-generated-thumbnail.jpg",
      },
    ];

    // Criar 10 petshops com nomes e endereços fictícios
    const petshops = [];
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i];
      const address = addresses[i];
      const imageUrl = images[i];

      const petshop = await prisma.petshop.create({
        data: {
          name,
          address,
          imageUrl: imageUrl,
        },
      });

      for (const service of services) {
        await prisma.service.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            petshop: {
              connect: {
                id: petshop.id,
              },
            },
            imageUrl: service.imageUrl,
          },
        });
      }

      petshops.push(petshop);
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar os Pet Shops:", error);
  }
}

seedDatabase();
