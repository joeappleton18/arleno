import React from 'react';
import Filter from '.';


const Template = args => <Filter {...args} />

export const Primary = Template.bind();

Primary.args = {
	items: [{ label: 'All', value: 'all' }, { label: 'Open', value: 'open' }, { label: 'Closed', value: 'closed' }],
	onFilterChange: (value) => { console.log(value) }
}

export default {
	title: 'Components/Filter',
	component: Filter,
}