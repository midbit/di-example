import { assertEquals, assertThrows } from "https://deno.land/std@0.107.0/testing/asserts.ts";
import {BookService} from "./index.ts"
import {BookRepositoryInterface} from "../../interfaces/repository/index.ts"
import {Book} from "../../domain/models/index.ts"

const mockRepositoryBuilder = (
	find: (id?: number) => Book[] = () => [], 
	update: (book: Book) => void = () => {}): BookRepositoryInterface => ({
	update,
	find
})

Deno.test("should call update with the borrowed Book's availability set as False when borrowing an existing Book", () => {
	const mockedFindFunction = () => [new Book(1,"test","test", true)]
	let callNumber = 0
	let calledValue
	const mockedUpdateFunction = (book: Book) => {
		callNumber += 1
		calledValue = book
	} 
	const repository = mockRepositoryBuilder(mockedFindFunction,mockedUpdateFunction)
	const testedService = new BookService(repository)
	testedService.borrow(1)
	assertEquals(callNumber, 1);
	assertEquals(calledValue, new Book(1, "test", "test", false));
});

Deno.test("should throw an error if trying to borrow an unavailable book", () => {
	const mockedFindFunction = () => [new Book(1,"test","test", false)]
	const repository = mockRepositoryBuilder(mockedFindFunction)
	const testedService = new BookService(repository)
	assertThrows(() => testedService.borrow(1))
});

Deno.test("should throw an error when borrowing a book that does not exists", () => {
	const mockedFindFunction = () => []
	const repository = mockRepositoryBuilder(mockedFindFunction)
	const testedService = new BookService(repository)
	assertThrows(() => testedService.borrow(1))
});

Deno.test("should call update with the returned Book's availability set as True when returning an existing Book", () => {
	const mockedFindFunction = () => [new Book(1,"test","test", false)]
	let callNumber = 0
	let calledValue
	const mockedUpdateFunction = (book: Book) => {
		callNumber += 1
		calledValue = book
	} 
	const repository = mockRepositoryBuilder(mockedFindFunction,mockedUpdateFunction)
	const testedService = new BookService(repository)
	testedService.return(1)
	assertEquals(callNumber, 1);
	assertEquals(calledValue, new Book(1, "test", "test", true));
});

Deno.test("should throw an error if trying to return an already available book", () => {
	const mockedFindFunction = () => [new Book(1,"test","test", true)]
	const repository = mockRepositoryBuilder(mockedFindFunction)
	const testedService = new BookService(repository)
	assertThrows(() => testedService.return(1))
});

Deno.test("should throw an error when returning a book that does not exists", () => {
	const mockedFindFunction = () => []
	const repository = mockRepositoryBuilder(mockedFindFunction)
	const testedService = new BookService(repository)
	assertThrows(() => testedService.return(1))
});

