export default function getCurrentDate(env = process.env.NEXT_PUBLIC_ENV) {
  switch (env) {
    case "test":
      return new Date("2023/01/01")
    default:
      return new Date()
  }
}
