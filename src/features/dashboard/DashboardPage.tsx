import { Box, Button, Chip, Typography } from '@mui/material';
import { Link } from 'react-router';
import { readSession } from '../../core/session/sessionStorage';
import { useEntitiesQuery } from '../../queries/entities';
import { Page, PageHeader } from '../../ui/layout';
import { RecentEntitiesSection } from '../../ui/RecentEntitiesSection';
import { SectionCard } from '../../ui/SectionCard';

export function DashboardPage() {
  const session = readSession();
  const q = useEntitiesQuery();
  const entityCount = q.data?.length ?? 0;

  return (
    <Page>
      <PageHeader
        title="Dashboard"
        description="Entry point to catalog data and preferences."
        actions={<Chip label="Session active" color="success" variant="outlined" sx={{ fontWeight: 600 }} />}
      />

      <SectionCard title="Overview">
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          Signed in as <strong>{session?.email}</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, lineHeight: 1.7 }}>
          Entities in catalog: <strong>{entityCount}</strong>
        </Typography>
      </SectionCard>

      <SectionCard title="Quick actions">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', lg: 'repeat(3, minmax(0, 1fr))' },
            gap: 2,
          }}
        >
          <Button component={Link} to="/app/entities/new" variant="contained" size="large" fullWidth>
            Create entity
          </Button>
          <Button component={Link} to="/app/entities" variant="outlined" size="large" fullWidth>
            Browse entities
          </Button>
          <Button component={Link} to="/app/favorites" variant="outlined" size="large" fullWidth>
            Favorites
          </Button>
          <Button component={Link} to="/app/account" variant="outlined" size="large" fullWidth>
            Account
          </Button>
          <Button component={Link} to="/app/settings" variant="outlined" size="large" fullWidth>
            Settings
          </Button>
        </Box>
      </SectionCard>

      <RecentEntitiesSection />
    </Page>
  );
}
