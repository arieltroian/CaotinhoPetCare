const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "https://i.ibb.co/yBQ9Z8P/alvan-nee-73flbl-FUks-Y-unsplash.jpg",
      "https://i.ibb.co/h1nQjY3/berkay-gumustekin-ngqyo2-AYYn-E-unsplash.jpg",
      "https://i.ibb.co/5MHmpCx/alvan-nee-T-0-EW-SEbs-E-unsplash.jpg",
      "https://i.ibb.co/Ctkk3y0/james-barker-v3-zc-CWMjg-M-unsplash.jpg",
      "https://i.ibb.co/k3xp0zP/bri-tucker-LGG5-P7-KCzi-U-unsplash.jpg",
      "https://i.ibb.co/PZZdDKN/andrew-s-ouo1hbiz-Wwo-unsplash.jpg",
      "https://i.ibb.co/ThXXXgP/pexels-pixabay-33492.jpg",
      "https://i.ibb.co/q5j2MKH/pexels-cong-h-1404819.jpg",
      "https://i.ibb.co/pnFFpRh/pexels-cats-coming-1543793.jpg",
      "https://i.ibb.co/L5GtF9r/pexels-septimiu-lupea-669015.jpg",
      "https://i.ibb.co/52Wgvbp/pexels-pixabay-416160.jpg",
      "https://i.ibb.co/nBwtcNT/pexels-brett-sayles-1080760.jpg",
      "https://i.ibb.co/hX3Y1J4/pexels-amit-talwar-3813324.jpg",
      "https://i.ibb.co/s5L8dtb/pexels-chevanon-photography-1108099.jpg",
      "https://i.ibb.co/CJm6wNN/pexels-ylanite-koppens-612813.jpg",
      "https://i.ibb.co/HTqZ68H/pexels-martin-dalsgaard-6910000.jpg",
      "https://i.ibb.co/qCghqbm/pexels-liam-ortiz-1840106.jpg",
      "https://i.ibb.co/bHC4cDx/pexels-lumn-406014.jpg",
      "https://i.ibb.co/6nkJhF6/pexels-pixabay-104827.jpg",
      "https://i.ibb.co/ZgwBTRK/cachorro-fofo-na-loja-de-animais-com-o-dono.jpg",
      "https://i.ibb.co/64n38RL/cachorro-fofo-com-dono-na-pet-shop.jpg",
    ];
    // Nomes dos Pet Shops
    const creativeNames = [
      "Pata Real",
      "Charme Animal",
      "PetStyle",
      "Peludos & Mimados",
      "Aconchego Pet",
      "Peludos & Cia.",
      "Pet Palace",
      "Mundo Animal Petshop",
      "Clínica Pet Alegria",
      "Mimopet",
    ];

    // Endereços fictícios dos Pet Shops
    const addresses = [
      "Rua da Barbearia, 123",
      "Avenida dos Cortes, 456",
      "Praça da Barba, 789",
      "Travessa da Navalha, 101",
      "Alameda dos Estilos, 202",
      "Estrada do Machado, 303",
      "Avenida Elegante, 404",
      "Praça da Aparência, 505",
      "Rua Urbana, 606",
      "Avenida Clássica, 707",
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
