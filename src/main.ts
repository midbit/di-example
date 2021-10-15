import { Application, Router } from "https://deno.land/x/oak/mod.ts"
import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.26.0/mod.ts"
import {BookRepository} from "./implementation/repository/index.ts"
import {BookService} from "./implementation/service/index.ts"
import {BookController} from "./implementation/controller/index.ts"


const client = new MongoClient()
await client.connect("mongodb://localhost:27017")
const database = client.database("BokBokLibrary")

const app = new Application();
const repository = new BookRepository()
const service = new BookService(repository)
const controller = new BookController(service)
 
const globalFilter = async (context: any, next: Function) => {
	try {
		await next()
	}
	catch(error) {
		const err = error as Error
		context.response.status = 500
		context.response.body = err.message
	}
}

const router = new Router()
router
.get("/books", controller.browse.bind(controller))
.get("/books/:id/borrow", controller.borrow.bind(controller))
.get("/books/:id/return", controller.return.bind(controller))

app.use(globalFilter)
app.use(router.routes())
app.use(router.allowedMethods())


await app.listen({ port: 8000 })
