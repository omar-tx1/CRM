import { PrismaClient, RoleType, AccountType, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const systemAccounts = [
  { code: "1000", name: "Cash", type: AccountType.ASSET },
  { code: "1100", name: "Accounts Receivable", type: AccountType.ASSET },
  { code: "2000", name: "Sales Tax Payable", type: AccountType.LIABILITY },
  { code: "2100", name: "Unearned Revenue", type: AccountType.LIABILITY },
  { code: "3000", name: "Owner's Equity", type: AccountType.EQUITY },
  { code: "3100", name: "Retained Earnings", type: AccountType.EQUITY },
  { code: "4000", name: "Service Revenue", type: AccountType.REVENUE },
  { code: "4100", name: "Surcharges", type: AccountType.REVENUE },
  { code: "5000", name: "COGS - Disposal", type: AccountType.EXPENSE },
  { code: "5100", name: "Fuel", type: AccountType.EXPENSE },
  { code: "5200", name: "Dump Fees", type: AccountType.EXPENSE },
  { code: "5300", name: "Tools & Supplies", type: AccountType.EXPENSE },
  { code: "5400", name: "Software", type: AccountType.EXPENSE },
  { code: "5500", name: "Marketing", type: AccountType.EXPENSE }
];

async function main() {
  await prisma.role.upsert({
    where: { name: RoleType.ADMIN },
    update: {},
    create: { name: RoleType.ADMIN }
  });
  await prisma.role.upsert({
    where: { name: RoleType.DISPATCHER },
    update: {},
    create: { name: RoleType.DISPATCHER }
  });
  await prisma.role.upsert({
    where: { name: RoleType.CREW },
    update: {},
    create: { name: RoleType.CREW }
  });
  await prisma.role.upsert({
    where: { name: RoleType.VIEWER },
    update: {},
    create: { name: RoleType.VIEWER }
  });

  const adminRole = await prisma.role.findUnique({ where: { name: RoleType.ADMIN } });

  if (adminRole) {
    await prisma.user.upsert({
      where: { email: "admin@texasjunkboyz.com" },
      update: {},
      create: {
        email: "admin@texasjunkboyz.com",
        name: "TJB Admin",
        roleId: adminRole.id
      }
    });
  }

  for (const account of systemAccounts) {
    await prisma.account.upsert({
      where: { code: account.code },
      update: {},
      create: account
    });
  }

  await prisma.taxRate.upsert({
    where: { id: "default-tax" },
    update: {
      label: "Default",
      percent: new Prisma.Decimal(8.25)
    },
    create: {
      id: "default-tax",
      label: "Default",
      percent: new Prisma.Decimal(8.25)
    }
  });
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
