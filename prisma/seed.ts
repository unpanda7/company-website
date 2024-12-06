import { PrismaClient } from "@prisma/client";
import { fakerZH_CN as faker } from "@faker-js/faker";

const prisma = new PrismaClient();


async function main() {
  // await prisma.productCategory.deleteMany();
  // await prisma.product.deleteMany();
  // await prisma.category.deleteMany();
  // await prisma.carousel.deleteMany();
  // await prisma.companyInfo.deleteMany();

  // // 创建公司信息
  // await prisma.companyInfo.create({
  //   data: {
  //     name: "非得戒烟科技有限公司",
  //     logo: faker.image.url(),
  //     phone: faker.phone.number(),
  //     email: faker.internet.email(),
  //     address: faker.location.streetAddress(true),
  //     latitude: faker.location.latitude(),
  //     longitude: faker.location.longitude(),
  //     wechatQR: faker.image.url(),
  //     shortDesc: faker.company.catchPhrase(),
  //     fullDesc: faker.company.catchPhrase(),
  //   },
  // });



  // // 创建分类
  // const categories = await Promise.all(
  //   Array.from({ length: 5 }, (_, i) => {
  //     return prisma.category.create({
  //       data: {
  //         name: faker.commerce.department(),
  //         description: faker.commerce.productDescription(),
  //         order: i,
  //       },
  //     });
  //   })
  // );


  // // 创建产品
  // const products = await Promise.all(
  //   Array.from({ length: 20 }, () =>
  //     prisma.product.create({
  //       data: {
  //         name: faker.commerce.productName(),
  //         description: faker.commerce.productDescription(),
  //         price: parseFloat(faker.commerce.price()),
  //       },
  //     })
  //   )
  // );

  // // 创建产品分类关联
  // // 确保每个产品至少属于一个分类，可能属于多个分类
  // await Promise.all(
  //   products.map(async (product) => {
  //     // 随机选择1-3个分类
  //     const numCategories = Math.floor(Math.random() * 3) + 1;
  //     const selectedCategories = faker.helpers.shuffle([...categories])
  //       .slice(0, numCategories);

  //     return Promise.all(
  //       selectedCategories.map((category) =>
  //         prisma.productCategory.create({
  //           data: {
  //             productId: product.id,
  //             categoryId: category.id,
  //           },
  //         })
  //       )
  //     );
  //   })
  // );
  // 创建轮播图
  // await Promise.all(
  //   Array.from({ length: 5}, () => {
  //     return prisma.carousel.create({
  //       data: {
  //         imageUrl: faker.image.url(),
  //       },
  //     })
  //   })
  // );
  // // 清除现有数据
  // await prisma.companyInfo.deleteMany()

  // // 创建新的公司信息
  // await prisma.companyInfo.create({
  //   data: {
  //     name: "示例公司",
  //     logo: faker.image.url(),
  //     phone: faker.phone.number(),
  //     email: faker.internet.email(),
  //     address: faker.location.streetAddress(true),
  //     latitude: parseFloat(faker.location.latitude()),
  //     longitude: parseFloat(faker.location.longitude()),
  //     wechatQR: faker.image.url(),
  //     shortDesc: faker.company.catchPhrase(),
  //     fullDesc: faker.company.catchPhrase(),
  //   },
  // })

  // await prisma.carousel.deleteMany()

  // const carouselList = Array.from({ length: 5 }, (_, i) => ({
  //   imageUrl: faker.image.dataUri(
  //     {
  //       width: 1000,
  //       height: 600,
  //       color: faker.color.rgb(),
  //     }
  //   ),
  //   link: faker.internet.url(),
  //   sort: i,
  // }))

  // await prisma.carousel.createMany({
  //   data: carouselList,
  // })

  // 为所有存在的产品添加 imageUrl
  // const categories = await prisma.category.findMany()
  // await Promise.all(categories.map(async (category) => {
  //   await prisma.category.update({
  //     where: { id: category.id },
  //     data: { imageUrl: faker.image.urlLoremFlickr({ height: 600, width: 400 }) },
  //   })
  // }))

  // 添加成功案例
  // await prisma.successCase.createMany({
  //   data: Array.from({ length: 5 }, () => ({
  //     name: faker.company.name(),
  //     description: faker.company.catchPhrase(),
  //     imageUrl: faker.image.urlLoremFlickr({ height: 400, width: 600 }),
  //   })),
  // })



  await prisma.recruitment.createMany({
    data: Array.from({ length: 5 }, () => ({
      title: faker.company.catchPhrase(),
      content: `
        <h3>${faker.company.catchPhrase()}</h3>
        <p>${faker.lorem.paragraph()}</p>
        <h4>岗位要求：</h4>
        <ul>
          ${Array.from({ length: 5 }, () => `<li>${faker.lorem.sentence()}</li>`).join('\n')}
        </ul>
        <h4>工作职责：</h4>
        <ul>
          ${Array.from({ length: 4 }, () => `<li>${faker.lorem.sentence()}</li>`).join('\n')}
        </ul>
        <p>${faker.lorem.paragraphs(2, '<br/><br/>')}</p>
      `.trim(),
    })),
  })
}

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
