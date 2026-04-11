import { Alert, Button, Card, CircularProgress, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router';
import { useEntitiesQuery } from '../../../queries/entities';
import { useNotify } from '../../../core/notify/useNotify';
import { EmptyState } from '../../../ui/EmptyState';
import { Page, PageHeader } from '../../../ui/layout';
import { EntityCatalogToolbar } from '../components/EntityCatalogToolbar';
import { EntityCatalogTable } from '../components/EntityCatalogTable';

export function EntitiesListPage() {
  const notify = useNotify();
  const q = useEntitiesQuery();

  if (q.isLoading && !q.data) {
    return (
      <Page sx={{ minHeight: '50vh', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Page>
    );
  }

  if (q.isError) {
    return (
      <Page>
        <PageHeader
          title="Entities"
          description="Search, filter, star rows for Favorites, and open a row to edit."
        />
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={async () => {
                const r = await q.refetch();
                if (r.isSuccess) notify({ severity: 'success', message: 'Catalog refreshed.' });
              }}
            >
              Retry
            </Button>
          }
        >
          {(q.error as Error).message}
        </Alert>
      </Page>
    );
  }

  const rows = q.data ?? [];

  return (
    <Page>
      <PageHeader
        title="Entities"
        description="Search, filter, star rows for Favorites, and open a row to edit."
        actions={
          <Button component={Link} to="/app/entities/new" variant="contained" size="large" startIcon={<AddIcon />}>
            New entity
          </Button>
        }
      />

      {rows.length === 0 ? (
        <Card className="nx-product-surface" variant="outlined" sx={{ overflow: 'hidden' }}>
          <EmptyState
            title="No records"
            description="There are no entities yet. Create one or reload after seed data is available."
            actionLabel="Reload"
            onAction={async () => {
              const r = await q.refetch();
              if (r.isSuccess) notify({ severity: 'success', message: 'Catalog refreshed.' });
            }}
          />
        </Card>
      ) : (
        <Card className="nx-product-surface" variant="outlined" sx={{ overflow: 'hidden' }}>
          <EntityCatalogToolbar />
          <Divider />
          <EntityCatalogTable rows={rows} />
        </Card>
      )}
    </Page>
  );
}
