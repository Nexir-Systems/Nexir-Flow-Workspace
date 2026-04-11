import { Box, Button, Stack, Typography, type SxProps, type Theme } from '@mui/material';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { pageContainerSx } from './pageLayoutSx';

type PageProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export function Page({ children, sx }: PageProps) {
  return (
    <Box sx={sx ? ([pageContainerSx, sx] as SxProps<Theme>) : pageContainerSx}>
      {children}
    </Box>
  );
}

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

/** Standard product header: H1 + optional lead; `actions` stay top-right from `md` up. */
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 2.5, md: 3 }}
      sx={{
        alignItems: { xs: 'stretch', md: 'flex-start' },
        justifyContent: 'space-between',
        gap: { md: 4 },
      }}
    >
      <Box sx={{ minWidth: 0, flex: actions ? { md: '1 1 auto' } : undefined }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.2,
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
        {description ? (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mt: 1.75,
              maxWidth: '42rem',
              lineHeight: 1.65,
              fontSize: '1rem',
            }}
          >
            {description}
          </Typography>
        ) : null}
      </Box>
      {actions ? (
        <Box sx={{ flexShrink: 0, alignSelf: { xs: 'stretch', md: 'flex-start' } }}>{actions}</Box>
      ) : null}
    </Stack>
  );
}

type PageBackLinkProps = {
  to: string;
  children: ReactNode;
};

/** Consistent tertiary navigation above page titles — never full-width. */
export function PageBackLink({ to, children }: PageBackLinkProps) {
  return (
    <Button
      component={Link}
      to={to}
      variant="text"
      color="inherit"
      sx={{
        alignSelf: 'flex-start',
        width: 'auto',
        minWidth: 0,
        maxWidth: 'fit-content',
        display: 'inline-flex',
        flexShrink: 0,
        mb: 1,
        px: 1,
        ml: -1,
        color: 'text.secondary',
        fontWeight: 500,
        '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
      }}
    >
      {children}
    </Button>
  );
}
