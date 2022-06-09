import { useState, MouseEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { buttonStyle, OptionsMenuStyle } from '../../app/styles/styles';
import { EditLabelMenu } from './EditLabelMenu';
import { SelectLabelMenu } from './SelectLabelMenu';

interface Props {
  cardId: string;
  icon?: boolean;
}

export const LabelMenu = ({ cardId, icon }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [view, setView] = useState<'Create' | 'Edit' | 'Select'>('Select');
  const [selectedLabel, setSelectedLabel] = useState<string>('');

  return (
    <>
      <Box sx={{}}>
        {icon ? (
          <IconButton
            sx={{
              borderRadius: '0',
              p: '8px',
            }}
            onClick={(e: MouseEvent<HTMLButtonElement>) =>
              setAnchorEl(e.currentTarget)
            }
          >
            <AddBoxOutlinedIcon fontSize='large' />
          </IconButton>
        ) : (
          <Button
            variant='contained'
            fullWidth
            disableElevation
            disableRipple
            sx={(theme) => ({
              ...buttonStyle,
              backgroundColor: theme.palette.grey['200'],
              color: theme.palette.text.primary,
              '&:hover': {
                backgroundColor: theme.palette.grey['400'],
              },
            })}
            onClick={(e: MouseEvent<HTMLButtonElement>) =>
              setAnchorEl(e.currentTarget)
            }
          >
            Labels
          </Button>
        )}
      </Box>
      <Menu
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        sx={(theme) => ({ ...OptionsMenuStyle })}
        elevation={6}
        anchorEl={anchorEl}
      >
        {view === 'Select' ? (
          <SelectLabelMenu
            cardId={cardId}
            selectedLabel={selectedLabel}
            setSelectedLabel={setSelectedLabel}
            setView={setView}
          />
        ) : (
          <EditLabelMenu id={selectedLabel} view={view} setView={setView} />
        )}
      </Menu>
    </>
  );
};
