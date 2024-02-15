/**
 * @param {TemplateStringsArray} textFragments
 * @param  {Value[]} valueFragments
 * @returns {Query}
 */
export function templateSqlQuery(textFragments, ...valueFragments) {
	/** @type {Query} */
	const query = {
		text: textFragments[0],
		values: []
	};
	valueFragments.forEach((valueFragment, i) => {
		const q = values([valueFragment])(query.values.length);
		query.text += q.text + textFragments[i + 1];
		query.values = query.values.concat(q.values);
	});

	return query;
}

/**
 *
 * @param {Value[]} values
 * @returns {(index: number) => Query }
 */
function values(values) {
	return (valuePosition) => ({
		text: Array.from({ length: values.length })
			.map(() => '$' + ++valuePosition)
			.join(', '),
		values
	});
}
