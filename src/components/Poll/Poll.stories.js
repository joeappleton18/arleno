import React from 'react';
import Poll from '.';


const Template = args => <Poll {...args} />




export const Primary = Template.bind({});
export default {
	title: 'Components/Poll',
	component: Poll,
}