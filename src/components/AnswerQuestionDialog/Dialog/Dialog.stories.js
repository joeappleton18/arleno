import React from 'react';
import RenderDialog from './';


const Template = args => <RenderDialog {...args} > This is test content </RenderDialog>

export const Primary = Template.bind();
Primary.args = { title: "this is a title", open: true, onClose: () => { console.log("close") }}
export default {
	title: 'Components/Dialog',
	component: RenderDialog,
}
