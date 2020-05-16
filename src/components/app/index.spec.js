import app from './app';

test('should return Hello World!', () => {
	const b = <app/>;
	expect(b).toBe('Hello World!');
});