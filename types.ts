
export interface Tool {
  id: string;
  title: string;
  category: 'Formulário' | 'Financeiro' | 'Operacional' | 'Recursos Humanos' | 'Catálogo' | 'Planejamento';
  url: string;
  description: string;
  status?: 'active' | 'maintenance' | 'beta';
}

export interface PortalStats {
  label: string;
  value: string;
  icon?: string;
}
