import React from 'react';
import RenderDialog from './';


const Template = args => <RenderDialog {...args} > This is test content </RenderDialog>

export const Primary = Template.bind();
Primary.args = { title: "In your groups, use the framework above (the 6 questions), to come up with a sample project idea for one of your team members.", open: true, onClose: () => { console.log("close") } }
export default {
	title: 'Components/Dialog',
	component: RenderDialog,
}
