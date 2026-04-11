import type { ReactNode } from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Tooltip, Typography } from '@mui/material';
import { NavLink } from 'react-router';

export type ShellNavItemProps = {
  to: string;
  icon: ReactNode;
  label: string;
  onNavigate?: () => void;
  /** Icon-only rail with tooltips (collapsed desktop drawer). */
  collapsed?: boolean;
};

export function ShellNavItem({ to, icon, label, onNavigate, collapsed = false }: ShellNavItemProps) {
  return (
    <NavLink to={to} onClick={onNavigate} style={{ textDecoration: 'none', color: 'inherit' }}>
      {({ isActive }) => {
        const button = (
          <ListItemButton
            selected={isActive}
            sx={{
              borderRadius: 2,
              mb: 0.5,
              py: 1.25,
              px: collapsed ? 1 : 1.25,
              justifyContent: collapsed ? 'center' : 'flex-start',
              transition: 'background-color 0.18s ease',
              '&:hover': {
                bgcolor: 'action.hover',
              },
              '&.Mui-selected': {
                bgcolor: (t) =>
                  t.palette.mode === 'dark' ? 'rgba(143,168,255,0.14)' : 'rgba(48,63,159,0.10)',
                '&:hover': {
                  bgcolor: (t) =>
                    t.palette.mode === 'dark' ? 'rgba(143,168,255,0.2)' : 'rgba(48,63,159,0.14)',
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: collapsed ? 0 : 40,
                justifyContent: 'center',
                mr: collapsed ? 0 : undefined,
              }}
            >
              {icon}
            </ListItemIcon>
            {!collapsed ? (
              <ListItemText
                primary={
                  <Typography component="span" sx={{ fontWeight: isActive ? 700 : 500, fontSize: '1rem' }}>
                    {label}
                  </Typography>
                }
              />
            ) : null}
          </ListItemButton>
        );
        return collapsed ? (
          <Tooltip title={label} placement="right" arrow enterDelay={300}>
            {button}
          </Tooltip>
        ) : (
          button
        );
      }}
    </NavLink>
  );
}
