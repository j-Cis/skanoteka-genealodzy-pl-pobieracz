/**
 * Zbyt duża ilość żądań, może doprowadzić do tego że serwer zablokuje 
 * nasz adres IP, uniemożliwiając dostęp gdyż uzna nasze działanie 
 * jako atak DDoS, dlatego niezwykle ważnym jest spowalnianie operacji
 * żądań odpowiedzi z serwera online - jakiegokolwiek, dobrze jest dobrać
 * podobną ilość operacji, jaką zrobilibyśmy - robiąc to bez automatyzacji.
 * 
 * @param ileZapytanNaMinute 
 * @returns
 */
export default async function spowalniacz( ileZapytanNaMinute: number ):Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, Math.ceil(60000/ileZapytanNaMinute));
	});
}