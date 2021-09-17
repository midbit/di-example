import Book from "../../domain/models/book.ts"

interface BookServiceInterface {
	borrow(id: number): void
	return(id: number): void
	browse(): Book[]
}

export default BookServiceInterface