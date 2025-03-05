import { chain } from '@/middlewares/chain'
import { withMiddleware2 } from '@/middlewares/middlewarei18n'

// export default chain([withMiddleware1, withMiddleware2])
export default chain([withMiddleware2])
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}