import IconButton from "@material-ui/core/IconButton";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterIcon from "@material-ui/icons/FilterList";
import { useState } from "react";
const Filter = (props) => {


	const { items, onFilterChange } = props;

	const [filterAnchorEl, setFilterAnchorEl] = useState(null);

	const handleFilterClose = () => {
		setFilterAnchorEl(null);
	}

	const handleFilterClick = (event) => {
		setFilterAnchorEl(event.currentTarget);
	}

	const handleFilterChange = (value) => {
		onFilterChange(value);
		setFilterAnchorEl(null);
	}

	return <>
		<IconButton>
			<FilterIcon onClick={handleFilterClick} />
		</IconButton>
		<Menu
			id="simple-menu"
			anchorEl={filterAnchorEl}
			keepMounted
			open={Boolean(filterAnchorEl)}
			onClose={handleFilterClose}
		>

			{
				items.map((item, index) => {
					return <MenuItem key={index} onClick={() => handleFilterChange(item)}>{item.label}</MenuItem>
				})
			}

		</Menu>

	</>
}

export default Filter;