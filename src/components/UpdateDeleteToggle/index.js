import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useState} from 'react';

const ITEM_HEIGHT = 48;
const UpdateDeleteToggle = (props) => {
    const { onDelete, onEdit } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        setAnchorEl(null);
        onEdit();

    }
  
    const handleDelete = () => {
        setAnchorEl(null);  
        onDelete();
    }


    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                <MenuItem onClick={handleEdit}>
                    Edit
                </MenuItem>

                <MenuItem onClick={handleDelete}>
                    Delete
                </MenuItem>

            </Menu>
        </div>
    );
}

export default UpdateDeleteToggle;