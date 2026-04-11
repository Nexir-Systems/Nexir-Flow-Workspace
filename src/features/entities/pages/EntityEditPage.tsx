import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Box, Button, Card, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { getSampleEntityPayload } from '../../../core/entity-form-sample';
import { useNotify } from '../../../core/notify/useNotify';
import { useEntityDetailQuery, useUpdateEntityMutation } from '../../../queries/entities';
import { FormActionsFooter, Page, PageBackLink, PageHeader } from '../../../ui/layout';
import { productCardPaddingSx } from '../../../ui/productCardPadding';
import { EntityFormFields } from '../components/EntityFormFields';
import { entityFormSchema, type EntityFormValues } from '../model/entityFormSchema';

export function EntityEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const notify = useNotify();
  const q = useEntityDetailQuery(id);
  const update = useUpdateEntityMutation();

  const form = useForm<EntityFormValues>({
    resolver: zodResolver(entityFormSchema),
    defaultValues: {
      name: '',
      description: '',
      status: 'draft',
      category: 'general',
      priority: 'medium',
      owner: '',
    },
  });

  useEffect(() => {
    if (!q.data) return;
    form.reset({
      name: q.data.name,
      description: q.data.description,
      status: q.data.status,
      category: q.data.category,
      priority: q.data.priority,
      owner: q.data.owner,
    });
  }, [q.data, form]);

  if (q.isLoading) {
    return (
      <Page sx={{ minHeight: '50vh', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Page>
    );
  }

  if (q.isError || !q.data) {
    return (
      <Page>
        <Alert severity="error">{(q.error as Error | undefined)?.message ?? 'Record not found.'}</Alert>
      </Page>
    );
  }

  const row = q.data;

  return (
    <Page>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch', width: '100%' }}>
        <PageBackLink to={`/app/entities/${row.id}`}>Back</PageBackLink>
        <PageHeader title="Edit entity" description="Update fields and save changes." />
      </Box>

      <Card className="nx-product-surface" variant="outlined">
        <Box sx={productCardPaddingSx}>
          <EntityFormFields register={form.register} errors={form.formState.errors} />
        </Box>
      </Card>

      <Card className="nx-product-surface" variant="outlined">
        <Box sx={productCardPaddingSx}>
          {update.isError ? (
            <Alert severity="error" sx={{ mb: 2.5 }}>
              {(update.error as Error).message}
            </Alert>
          ) : null}
          <FormActionsFooter
            onCancel={() => navigate(`/app/entities/${row.id}`)}
            secondaryActions={
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  form.reset({
                    ...getSampleEntityPayload(),
                    status: 'draft',
                    category: 'general',
                    priority: 'medium',
                  });
                  notify({ severity: 'info', message: 'Sample values applied to the form.' });
                }}
              >
                Generate sample data
              </Button>
            }
            primaryLabel="Save changes"
            primaryLoading={update.isPending}
            onPrimary={form.handleSubmit(async (values) => {
              try {
                const now = new Date().toISOString();
                await update.mutateAsync({
                  id: row.id,
                  patch: {
                    ...values,
                    activity: [
                      { id: `act-${row.id}-${now}`, at: now, label: 'Record updated' },
                      ...row.activity,
                    ],
                  },
                });
                notify({ severity: 'success', message: 'Changes saved.' });
                navigate(`/app/entities/${row.id}`);
              } catch (e) {
                notify({
                  severity: 'error',
                  message: (e as Error).message ?? 'Unable to save changes.',
                });
              }
            })}
          />
        </Box>
      </Card>
    </Page>
  );
}
