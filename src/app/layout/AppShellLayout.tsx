import DashboardIcon from '@mui/icons-material/Dashboard';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import StarIcon from '@mui/icons-material/Star';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { Box, Button, Divider, Drawer, IconButton, List, Tooltip, Typography } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useLogoutMutation } from '../../queries/auth';
import { useNotify } from '../../core/notify/useNotify';
import { ShellNavItem } from '../../ui/ShellNavItem';
import { useSidebarCollapsed } from './useSidebarCollapsed';

/** Expanded rail width (desktop). Collapsed is icon-only. */
export const SIDEBAR_WIDTH_EXPANDED_PX = 260;
const SIDEBAR_WIDTH_COLLAPSED_PX = 72;

/** Vertical center of the desktop sidebar brand row (matches `DrawerBody` title block). */
function sidebarToggleTopSx(collapsed: boolean) {
  return (theme: Theme) => {
    const padTop = theme.spacing(3.5);
    if (collapsed) {
      return `calc(${padTop} + 0.5rem - 18px)`;
    }
    return `calc(${padTop} + (1.25 * 0.9375rem) / 2 - 18px)`;
  };
}

const nav = [
  { to: '/app/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { to: '/app/entities', label: 'Entities', icon: <TableRowsIcon /> },
  { to: '/app/favorites', label: 'Favorites', icon: <StarIcon /> },
  { to: '/app/settings', label: 'Settings', icon: <SettingsIcon /> },
];

function drawerPaperSx(widthPx: number) {
  return {
    width: widthPx,
    boxSizing: 'border-box' as const,
    height: '100vh',
    maxHeight: '100vh',
    borderRight: 1,
    borderColor: 'divider',
    bgcolor: 'background.paper',
  };
}

type DrawerBodyProps = {
  collapsed: boolean;
  onNavigate: () => void;
};

function DrawerBody({ collapsed, onNavigate }: DrawerBodyProps) {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Box
        sx={{
          px: collapsed ? 1 : 2,
          pt: 3.5,
          pb: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: collapsed ? 'center' : 'stretch',
        }}
      >
        {!collapsed ? (
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              fontSize: '0.9375rem',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: 0,
            }}
          >
            Nexir Flow Workspace
          </Typography>
        ) : (
          <Tooltip title="Nexir Flow Workspace" placement="right" arrow enterDelay={300}>
            <Typography
              component="span"
              sx={{ fontWeight: 800, fontSize: '1rem', lineHeight: 1, cursor: 'default' }}
            >
              N
            </Typography>
          </Tooltip>
        )}
        <Divider sx={{ width: '100%', my: 3 }} />
      </Box>
      <List sx={{ px: collapsed ? 0.75 : 1.25, flex: 1, py: 1, overflow: 'auto' }}>
        {nav.map((item) => (
          <ShellNavItem
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ))}
      </List>
      <Divider sx={{ my: 4 }} />
      <List sx={{ px: collapsed ? 0.75 : 1.25, py: 1.5, pt: 0 }}>
        <ShellNavItem
          to="/app/account"
          label="Account"
          icon={<PersonIcon />}
          collapsed={collapsed}
          onNavigate={onNavigate}
        />
      </List>
    </Box>
  );
}

export function AppShellLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { collapsed: sidebarCollapsed, toggle: toggleSidebarCollapsed } = useSidebarCollapsed();
  const navigate = useNavigate();
  const notify = useNotify();
  const logout = useLogoutMutation();

  const closeMobile = () => setMobileOpen(false);

  const desktopDrawerWidth = sidebarCollapsed ? SIDEBAR_WIDTH_COLLAPSED_PX : SIDEBAR_WIDTH_EXPANDED_PX;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <IconButton
        color="primary"
        aria-label="open navigation"
        onClick={() => setMobileOpen(true)}
        sx={{
          display: { xs: 'inline-flex', md: 'none' },
          position: 'fixed',
          top: 14,
          left: 14,
          zIndex: (t) => t.zIndex.drawer + 2,
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'divider',
          boxShadow: 2,
        }}
      >
        <MenuIcon />
      </IconButton>

      <Button
        variant="outlined"
        color="primary"
        size="medium"
        disabled={logout.isPending}
        onClick={async () => {
          await logout.mutateAsync();
          notify({ severity: 'info', message: 'Signed out.' });
          navigate('/login');
        }}
        sx={{
          position: 'fixed',
          top: 14,
          right: 14,
          zIndex: (t) => t.zIndex.drawer + 2,
          px: 2,
          bgcolor: 'background.paper',
        }}
      >
        Sign out
      </Button>

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          width: '100%',
          minHeight: 0,
          pt: { xs: 8, md: 0 },
        }}
      >
        <Box
          component="nav"
          sx={{
            position: 'relative',
            display: { xs: 'none', md: 'block' },
            width: desktopDrawerWidth,
            flexShrink: 0,
            transition: (theme) =>
              theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }}
        >
          <Drawer
            variant="permanent"
            open
            sx={{
              width: desktopDrawerWidth,
              flexShrink: 0,
              transition: (theme) =>
                theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              '& .MuiDrawer-paper': (theme) => ({
                ...drawerPaperSx(desktopDrawerWidth),
                position: 'relative',
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              }),
            }}
          >
            <DrawerBody collapsed={sidebarCollapsed} onNavigate={closeMobile} />
          </Drawer>

          <Tooltip
            title={sidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
            placement="right"
            arrow
            enterDelay={400}
          >
            <IconButton
              color="primary"
              size="small"
              aria-label={sidebarCollapsed ? 'Expand navigation' : 'Collapse navigation'}
              aria-expanded={!sidebarCollapsed}
              onClick={toggleSidebarCollapsed}
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                position: 'absolute',
                left: '100%',
                ml: 0.5,
                top: sidebarToggleTopSx(sidebarCollapsed),
                zIndex: (t) => t.zIndex.drawer + 1,
              }}
            >
              {sidebarCollapsed ? (
                <KeyboardDoubleArrowRightIcon fontSize="small" />
              ) : (
                <KeyboardDoubleArrowLeftIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={closeMobile}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': drawerPaperSx(SIDEBAR_WIDTH_EXPANDED_PX),
          }}
        >
          <DrawerBody collapsed={false} onNavigate={closeMobile} />
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            minWidth: 0,
            pt: { xs: 0, md: 8 },
            px: 0,
            pb: 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
