import { Alert, Box, Button, Card, CardContent, CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useEntityDetailQuery } from '../../../queries/entities';
import { pushRecentEntityId } from '../../../core/recent/recentEntities';
import { Page, PageBackLink } from '../../../ui/layout';
import { SectionCard } from '../../../ui/SectionCard';
import { StatusBadge } from '../../../ui/StatusBadge';

export function EntityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const q = useEntityDetailQuery(id);

  useEffect(() => {
    if (q.data) pushRecentEntityId(q.data.id);
  }, [q.data]);

  if (q.isLoading) {
    return (
      <Page sx={{ minHeight: '50vh', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Page>
    );
  }

  if (q.isError) {
    return (
      <Page>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch' }}>
          <PageBackLink to="/app/entities">Entities</PageBackLink>
        </Box>
        <Alert severity="error">{(q.error as Error).message}</Alert>
      </Page>
    );
  }

  const row = q.data!;

  return (
    <Page>
      <Stack
        spacing={3}
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { md: 'flex-start' },
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ minWidth: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <PageBackLink to="/app/entities">Entities</PageBackLink>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700, letterSpacing: '-0.03em' }}>
              {row.name}
            </Typography>
            <StatusBadge status={row.status} />
            <Typography variant="body2" className="nx-muted" sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
              {row.id}
            </Typography>
          </Stack>
        </Box>
        <Button variant="contained" size="large" onClick={() => navigate(`/app/entities/${row.id}/edit`)}>
          Edit
        </Button>
      </Stack>

      <SectionCard title="Overview">
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.75 }}>
          {row.description}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(4, minmax(0, 1fr))',
            },
            gap: 3,
            columnGap: { xs: 3, md: 4 },
            alignItems: 'start',
          }}
        >
          {(
            [
              { label: 'Priority', value: row.priority, capitalize: true },
              { label: 'Category', value: row.category, capitalize: true },
              { label: 'Owner', value: row.owner, capitalize: false },
              { label: 'Updated', value: new Date(row.updatedAt).toLocaleString(), capitalize: false },
            ] as const
          ).map((item) => (
            <Box key={item.label} sx={{ minWidth: 0 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.75, letterSpacing: '0.04em' }}>
                {item.label}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  textTransform: item.capitalize ? 'capitalize' : 'none',
                  wordBreak: 'break-word',
                }}
              >
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </SectionCard>

      <SectionCard title="Metadata">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(auto-fill, minmax(220px, 1fr))',
            },
            gap: 2,
            alignItems: 'stretch',
          }}
        >
          {Object.entries(row.metadata).map(([k, v]) => (
            <Card key={k} variant="outlined" sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
              <CardContent
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  py: 2,
                  px: 2.5,
                  '&:last-child': { pb: 2 },
                }}
              >
                <Typography variant="caption" color="text.secondary" sx={{ letterSpacing: '0.04em' }}>
                  {k}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontWeight: 500, flex: 1, minHeight: 0, wordBreak: 'break-word' }}>
                  {v}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </SectionCard>

      <SectionCard title="Activity">
        <Stack spacing={2}>
          {row.activity.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No activity yet.
            </Typography>
          ) : (
            row.activity.map((a) => (
              <Typography key={a.id} variant="body2" component="div" sx={{ lineHeight: 1.75 }}>
                <Box component="span" sx={{ color: 'text.secondary', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                  {new Date(a.at).toLocaleString()}
                </Box>
                {' — '}
                {a.label}
              </Typography>
            ))
          )}
        </Stack>
      </SectionCard>
    </Page>
  );
}
