import { Box, Button, Card, CardContent, Link as MuiLink, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Link } from 'react-router';
import { InfoPanel } from '../../ui/InfoPanel';
import { EXAMPLE_SENSITIVE_PATHS } from '../../meta/examplePaths';
import { Page } from '../../ui/layout';

export function LandingPage() {
  return (
    <Page>
      <Card
        className="nx-product-surface"
        variant="outlined"
        sx={{
          overflow: 'hidden',
          background: (t) =>
            t.palette.mode === 'dark'
              ? `linear-gradient(135deg, ${alpha('#8fa8ff', 0.08)} 0%, transparent 45%), ${t.palette.background.paper}`
              : `linear-gradient(135deg, ${alpha('#303f9f', 0.07)} 0%, transparent 48%), ${t.palette.background.paper}`,
        }}
      >
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              mt: 0,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
              fontSize: { xs: '1.65rem', sm: '2rem', md: '2.25rem' },
              background: (t) =>
                t.palette.mode === 'dark'
                  ? 'linear-gradient(90deg, #e8eaf0 0%, #b4c4ff 100%)'
                  : 'linear-gradient(90deg, #1a237e 0%, #303f9f 55%, #3949ab 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Nexir Flow Workspace
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2.5, maxWidth: 560, lineHeight: 1.75, fontSize: '1.0625rem' }}>
            A neutral product shell for authentication, routing, entities, and local preferences—ready for focused
            engineering tasks.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
            <Button component={Link} to="/login" variant="contained" size="large">
              Sign in
            </Button>
            <Button component={Link} to="/register" variant="outlined" size="large">
              Create account
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card className="nx-product-surface" variant="outlined">
        <CardContent sx={{ p: { xs: 3, sm: 3.5 } }}>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.12em', fontWeight: 600 }}>
            Explore the app
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
            Structure and routes
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2, maxWidth: 640, lineHeight: 1.7 }}>
            Open the application map for a concise overview of routes, layers, and where mock data lives in this
            repository.
          </Typography>
          <Button component={Link} to="/workspace-map" variant="contained" size="large" sx={{ mt: 3 }}>
            View application map
          </Button>
        </CardContent>
      </Card>

      <Card className="nx-product-surface" variant="outlined">
        <CardContent sx={{ p: { xs: 3, sm: 3.5 } }}>
          <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: '0.12em', fontWeight: 600 }}>
            Where to start in the repo
          </Typography>
          <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
            Repository entry points
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2, lineHeight: 1.65 }}>
            Same layout as the Angular reference: core storage, mocks, queries, and feature slices—mapped to this React
            tree.
          </Typography>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {EXAMPLE_SENSITIVE_PATHS.map((row) => (
              <Box key={row.path}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  {row.label}
                </Typography>
                <Typography
                  variant="body2"
                  component="code"
                  sx={{
                    display: 'inline-block',
                    mt: 0.75,
                    px: 1.25,
                    py: 0.5,
                    borderRadius: 1,
                    fontFamily: 'ui-monospace, monospace',
                    fontSize: '0.875rem',
                    bgcolor: (t) => alpha(t.palette.primary.main, t.palette.mode === 'dark' ? 0.12 : 0.08),
                    color: 'primary.main',
                  }}
                >
                  {row.path}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.65 }}>
                  {row.hint}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      <Card className="nx-product-surface" variant="outlined">
        <CardContent sx={{ p: { xs: 3, sm: 3.5 } }}>
          <InfoPanel title="Access">
            Routes under <code>/app</code> require a session; use{' '}
            <MuiLink component={Link} to="/login">
              Sign in
            </MuiLink>{' '}
            or{' '}
            <MuiLink component={Link} to="/register">
              Create account
            </MuiLink>{' '}
            to continue.
          </InfoPanel>
        </CardContent>
      </Card>
    </Page>
  );
}
