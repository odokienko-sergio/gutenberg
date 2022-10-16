const { registerBlockType } = wp.blocks;

import Edit from './edit';
import blockData from '../block.json';

wp.domReady(() => {
	registerBlockType( blockData.name, {
		title: blockData.title,
		attributes: blockData.attributes,
		edit: Edit,
		save: ( props ) => {
			return null;
		},
	} );
});