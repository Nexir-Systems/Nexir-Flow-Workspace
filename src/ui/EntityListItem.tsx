import { ListItemButton, ListItemText } from '@mui/material';

type Props = {
  primary: string;
  secondary: string;
  onClick?: () => void;
};

export function EntityListItem({ primary, secondary, onClick }: Props) {
  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        borderRadius: 2,
        py: 1.75,
        px: 2,
        mb: 0.5,
        transition: 'background-color 0.15s ease',
        '&:hover': { bgcolor: 'action.hover' },
      }}
    >
      <ListItemText
        primary={primary}
        secondary={secondary}
        slotProps={{
          primary: { sx: { fontWeight: 600, fontSize: '1rem' } },
          secondary: { sx: { mt: 0.5 } },
        }}
      />
    </ListItemButton>
  );
}
