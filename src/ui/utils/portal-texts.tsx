import { urls } from './urls';
import LOGOProjetoColabora from '@app/assets/images/projetocolabora.com.br.png';
import LOGOinfoamazonia from '@app/assets/images/infoamazonia.org.png';
import LOGOoeco from '@app/assets/images/oeco.org.br.png';

export const TEXTS = {
  contactEmail: 'teste@contato.com',
  defaultSubmitText: 'Continuar',
  stateList: [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO', 'DF'
  ],
  cookieAlert: {
    text: 'Nós utilizamos cookies essenciais para o site funcionar e alguns adicionais para entender como você utiliza o Diário do Clima. Mais detalhes nos Termos.'
  },
  passwordValidation: {
    eightChars: 'Ter 8 ou mais caracteres',
    lettersAndNumbers: 'Conter letras e números',
    specialChars: 'Conter caracteres especiais (*,!.&%$#@)',
    uppercaseChar: 'Conter uma letra maiúscula',
  },
  warnModal: {
    cancel: 'Cancelar',
    ok: 'Ok, entendi',
  },
  menu: {
    logoImageAlt: 'Logo do Diario do Clima',
    pro: 'Diario do Clima PRO',
    reports: 'Relatórios',
    search: 'Buscar',
    about: 'Sobre o Diário do Clima',
    buttonSearch: 'Começar a buscar',
    buttonSession: 'Iniciar Sessão',
    contactUs: 'Fale conosco',
    termsAndConditions: 'Termos e condições'
  },
  loggedMenu: {
    myAccount: 'Minha conta',
    myReports: 'Meus relatórios',
    myAlerts: 'Alertas salvos',
    singOut: 'Deslogar',
  },
  footer: {
    about: 'Sobre o diário do clima',
    reports: 'Relatórios de análises aprofundadas',
    pro: 'Assinatura PRO',
    termsAndConditions: 'Termos e condições'
  },
  loginForm: {
    title: 'Acesse sua conta',
    subTitle: 'Lorem ipsum sit amet consectetur',
    errorMessage: 'Ocorreu um erro ao tentar logar em sua conta, por favor, verifique os dados e tente novamente.',
    register: 'Faça o cadastro',
    doesntHaveAccount: 'Não possui uma conta?',
    inputEmail: 'E-mail',
    inputPassword: 'Senha',
    submit: 'Continuar',
    forgotpassword: 'Esqueceu sua senha?',
  },
  filters: {
    applyFilters: 'Aplicar Filtro',
  },
  becomeProModal: {
    title: 'Faça upgrade para Profissional',
    subtitle: 'Para acessar todas as funcionalidades disponíveis no Diário do Clima, faça um teste grátis por 7 dias.',
    cancel: 'Cancelar',
    startTest: 'Começar período grátis',
    knowMore: 'Saiba mais sobre a assinatura',
  },
  alertCreatedModal: {
    title: 'Pronto! Agora é só aguardar',
    subtitle: 'Já estamos de olho nos diários oficiais  e enviaremos qualquer novidade baseado nos seus filtros',
    createAnother: 'Criar outro alerta',
    continue: 'Continuar',
    cotinueSearch: 'Continuar buscando'
  },
  editEmail: {
    title: 'Edite o e-mail para recebimento dos novos alertas.',
    subtitle: 'O seu e-mail de cadastro continuará sendo',
    submit: 'Salvar e-mail de alerta',
    inputLabel: 'E-mail',
    apiError: 'Ocorreu um erro ao tentar salvar o e-mail, por favor, tente novamente',
    invalidError: 'O e-mail inserido é invalido',
  },
  modalQuery: {
    title: 'Cadastre as palavras-chave do seu alerta e enviaremos as novidades que tiverem os termos buscados.',
    inputLabel: 'Ex: Consulta teste',
    apply: 'Aplicar'
  },
  createAlertModal: {
    title: 'Crie um alerta com aspectos da política ambiental que deseja monitorar',
    filters: 'Edite os filtros para receber alertas com o tema que você quer',
    localFilter: 'Município:',
    themesFilter: 'Temas:',
    enteFilter: 'Ente do governo:',
    keyWords: 'Adicione palavras-chave',
    keyWordsPlaceHolder: 'Cadastre palavras chaves na sua busca (Obrigatório)',
    alertDestination: 'Seus alertas serão encaminhados para',
    edit: 'Editar',
    create: 'Criar Alerta',
    error: 'Ocorreu um erro ao cadastrar o alerta, por favor, tente novamente'

  },
  home: {
    lead: {
      titleA: 'Encontre um',
      titleB: 'ato ambiental',
      subtitle: 'O diário do Clima filtra as informações dos diários oficiais para você descobrir o que precisa mais fácil e rapidamente',
      buttonTitle: 'Começar a buscar',
      deviceImageAlt: 'Exemplo de ui do diario do clima',
    },
    data: {
      title: 'Dados confiáveis baseados no querido diário',
      label: {
        city: {
          data: '21',
          featured: 'cidades',
          label: ' já estão disponíveis para realizar buscas',
        },
        diaries: {
          data: '139mil',
          featured: 'diários oficiais',
          label: ' encontrados pela busca até o momento',
        },
        citiesMore: {
          data: '2420',
          featured: 'cidades',
          label: ' estarão disponíveis em breve',
        }
      }
    },
    weOffer: {
      titleA: 'O que oferecemos no',
      titleB: 'Diário do Clima PRO',
      option: {
        history: 'HISTÓRICO',
        theme: 'TEMAS',
        alerts: 'ALERTAS'
      },
      optionImageAlt: 'Representação visual da opção atualmente selecionada',
      subtitle: 'Acesse todo o histórico de resultados',
      text: 'Veja tudo o que já foi publicado, além dos três últimos meses, sobre políticas públicas ambientais',
      buttonTrial: 'Teste grátis por 7 dias',
      linkAboutSubscription: 'Saiba mais sobre a assinatura'
    },
    helpUs: {
      title: 'Ajude o diário do clima a crescer e receba benefícios',
      subtitle: 'Tenha em mãos todas as informações que você e sua equipe precisam sobre políticas públicas ambientais',
      buttonSubscribe: 'Quero apoiar assinando',
      buttonStart: 'Começar a buscar grátis'
    },
    moreData: {
      title: 'Mais dados. Mais insights',
      subtitle: 'Informações curadas por profissionais e baseadas nos diários oficiais para ajudar pesquisadores, consultores e organizações a estarem a par dos últimos acontecimentos.',
      linkAboutReports: 'Saiba mais sobre os relatórios'
    },
  },
  aboutPage: {
    title: 'SOBRE O DIÁRIO DO CLIMA',
    subTitle: 'Nós estamos aqui para promover transparência',
    description: 'O Diário do Clima é uma plataforma para auxiliar principalmente jornalistas e comunicadores sociais, mas também grupos de pesquisas, consultorias, empresas com atuação com responsabilidade social e governos a acompanharem os atos publicados pelos estados e municípios brasileiros relacionados ao meio ambiente. Monitora os atos publicados em jornais oficiais, raspa e processa os documentos com o uso da IA, para categorizar e organizar as informações. Tendo a tecnologia como aliada e como parte do fluxo de produção de conteúdo, possibilita a  cobertura de temas que, de outra forma, ficariam invisíveis. Este produto tem uma interface pública gratuita com recursos direcionados ao jornalismo local, que pode focar em temas de maior interesse de seus públicos. Os veículos têm acesso mais fácil a temas de interesse de seu público, o que agiliza a produção de conteúdo e aumenta a necessidade de responsabilização dos governos locais por suas ações.',
    photoLegend: 'Foto por USGS no Unsplash',
    whereStarted: 'Onde tudo começou',
    p1: 'O “Diário do Clima” é um projeto de autoria e administrado pelo consórcio formado pelas organizações jornalísticas: o Eco, Eco Nordeste, Agência Envolverde, InfoAmazonia, Open Knowledge Brasil e Projeto Colabora;  organizações que atuam na cobertura jornalística de temas relacionados à sustentabilidade, meio ambiente e análise de dados e transparência nas as contas públicas. A plataforma teve apoio de capital semente do Google News Initiative para desenvolver o Mínimo Produto Viável (MVP).',
    p2: '',
    objective: 'Nosso propósito é facilitar o acesso a dados sobre o clima para proteger o meio ambiente',
    support: 'Contamos com seu apoio!',
    becomePro: 'Você pode se tornar um assinante. Assim, você recebe os benefícios de ser PRO e ainda ajuda o Diário do Clima a abrir os dados de novas cidades e desenvolver novas ferramentas!',
    signUp: 'Quero assinar',
    partnersTitle: 'Quem está por trás disso',
    accessSite: 'Acessar o site'
  },
  becomeProPage: {
    title: 'Torne-se assinante do',
    titleSpan: 'Diário do Clima PRO',
    signDescription: 'Ao assinar, você nos ajuda a desenvolver esse projeto sem fins lucrativos e tem acesso aos benefícios do Diário do Clima PRO',
    basicPlanTitle: 'O seu cadastro básico inclui:',
    basicItem: 'Acesso limitado ao conteúdo',
    proPlanTitle: 'A assinatura PRO inclui:',
    proItem1: 'Visualização de resultados de todo o histórico disponível no banco de dados',
    proItem2: 'Filtro de busca por temas inteligentes',
    proItem3: 'Criação de alertas com filtros e palavras-chaves personalizadas',
    signUp: 'Quero assinar',
    continue: 'Continuar sem assinatura',
  },
  cnpjPage: {
    cnpjTitle: 'INFORMAÇÕES SOBRE O CNPJ',
    search: 'Buscar atos ambientais',
    situation: 'Situação',
    geralInfo: 'Informações gerais',
    address: 'Endereço',
    partners: 'Sócios'
  },
  myAlerts: {
    alertItem: {
      keyWords: 'Palavras-chave:',
      filters: 'Filtros:',
      delete: 'Remover alerta',
    },
    deleteAlert: {
      title: 'Tem certeza que deseja remover o alerta?',
      subTitle: 'Você não receberá mais notificações desse alerta e essa configuração será deletada permanentemente.',
      ok: 'Sim, desejo remover',
      cancel: 'Cancelar',
    },
    title: 'Esses são seus alertas para encontrar novas políticas ambientais',
    text1A: 'Atualize ou adicione novas preferências de imóveis em',
    text1B: 'Criar novo alerta',
    text2A: 'Defina onde prefere receber notificações em',
    text2B: 'Editar e-mail',
    createAlert: 'Criar novo alerta',
    editEmail: 'Editar e-mail',
    alerts: 'Alertas salvos',
    emptyList: 'Você ainda não possui nenhum alerta',
    emptyButtonCreate: 'Criar alerta',
    errorMessage: 'Ocorreu um erro ao tentar deletar este alerta, por favor, tente novamente.',
  },
  myReports: {
    title: 'Meus relatórios',
    download: 'Baixar relatório',
    knowMore: 'Saiba mais sobre os relatórios',
    simulate: 'Solicitar proposta',
    emptyList: 'Você ainda não possui nenhum relatório',
  },
  myAccount: {
    title: 'Minha conta',
    subTitleA: 'Usuário',
    subTitleB: 'desde',
    yourData: 'Seus dados',
    remainingTime: (days: number) => `Faltam ${days} dias para expirar o teste grátis`,
    password: 'Senha: ••••••••',
    changeEmail: 'Alterar e-mail da conta',
    changePassowrd: 'Alterar senha',
    changeData: 'Alterar dados pessoais',
    plan: 'Detalhes do plano',
    proPlan: 'PRO',
    nextCharge: 'Sua próxima data de cobrança é',
    changePayment: 'Gerenciar informações de pagamento',
    cancelPlan: 'Cancelar assinatura',
    basic: 'Básico',
    startTest: 'Iniciar teste grátis PRO',
    needHelp: 'Precisa de ajuda?',
    contact: 'Entre em contato',
    existingEmail: 'Este e-mail já possui uma conta registrada',
    changeEmailTitle: 'Alterar e-mail da conta',
    saveNewEmail: 'Salvar e-mail',
    updatePassword: 'Ocorreu um erro ao tentar atualizar sua senha, por favor, tente novamente.',
    updateInfoError: 'Ocorreu um erro ao tentar atualizar suas informações, por favor, tente novamente.',
    updatePasswordTitle: 'Alterar senha',
    savePassword: 'Salvar senha',
    updateInfoTitle: 'Editar dados pessoais',
    saveInfo: 'Salvar dados',
    changePaymentTitle: 'Alterar dados de pagamento',
    savePayment: 'Salvar dados de pagamento',
    cancellingError: 'Ocorreu um erro ao tentar cancelar seu plano, por favor, tente novamente. Caso o erro persista, entre em contato conosco.',
    cancelPlanModal: {
      title: 'Deseja realmente cancelar seu plano PRO?',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      cancel: 'Voltar',
      ok: 'Cancelar plano',
    },
  },
  notFound: {
    title: '404 - Página não encontrada',
    subTitle: 'A página que você tentou acessar não existe.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis diam vel nisl aliquet aliquam. Donec dignissim massa et erat semper, eu condimentum eros cursus. Etiam convallis sollicitudin faucibus.',
    links: 'Links úteis:'
  },
  startSearchPage: {
    title: 'Vamos começar a buscar!',
    proText: 'Pronto, agora você pode utilizar todos as funcionalidades disponíveis no nosso plano PRO',
    basicText: 'Pronto, agora você já pode utilizar o Diário do Clima para encontrar uma política ambiental',
    start: 'Começar a buscar',
  },
  termsPage: {
    title: 'Termos e condições',
    section: [
      {
        title: 'Título h3',
        titleSize: 'h3',
        paragraphs: [
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque venenatis diam vel nisl aliquet aliquam. Donec dignissim massa et erat semper, eu condimentum eros cursus. Etiam convallis sollicitudin faucibus. Maecenas non dui eu quam consectetur finibus. Aliquam nisl dui, scelerisque a eros vel, lacinia pulvinar turpis. Phasellus placerat metus vitae dignissim scelerisque. Quisque ultrices arcu congue ante molestie, eu semper diam blandit. Nunc vehicula aliquet nibh. Vivamus convallis, lacus pharetra scelerisque consectetur, nibh turpis scelerisque arcu, eget ornare nibh risus eu nunc. Donec enim dui, feugiat et lobortis non, posuere in ipsum. Ut ut purus in dolor cursus viverra a sit amet lorem. Sed posuere finibus neque eget sodales. Vivamus sodales porttitor purus, eget rhoncus tortor.',
          'Phasellus suscipit magna in nibh placerat, vitae viverra mauris sagittis. Aliquam erat volutpat. Integer efficitur sapien tempus maximus blandit. Donec mi risus, dictum vel aliquam eu, mollis eu elit. In hac habitasse platea dictumst. Nulla molestie facilisis quam, eu semper odio interdum condimentum. Praesent ornare ut neque sed suscipit. Curabitur mi enim, lobortis vitae est et, placerat lobortis nisl. Phasellus ligula nibh, aliquam eget ligula et, lacinia egestas arcu'
        ],
      }, 
      {
        title: 'Título h4',
        titleSize: 'h4',
        paragraphs: [
          'Quisque ac faucibus lectus, et dignissim ex. Vestibulum a auctor nibh, in bibendum mi. Fusce consequat ligula libero, eu pretium tortor interdum at. Proin eget mi quis tellus aliquam cursus. Suspendisse et quam non leo bibendum molestie in vitae nunc. Nulla quam dolor, molestie eu dui quis, dictum faucibus arcu. Vivamus suscipit gravida leo, id laoreet leo faucibus at. Donec id bibendum leo.',
        ],
        list: [
          'Duis porttitor et ligula vel mollis. Fusce ac ullamcorper arcu, condimentum auctor urna. Vivamus ut euismod quam.',
          'Ut ipsum augue, tincidunt porttitor velit non, egestas tincidunt eros. Vivamus sed urna sed nibh maximus consectetur vitae quis neque. ',
          'Quisque quis urna vel purus pretium faucibus eu a quam. Integer mauris est, auctor in maximus eget, aliquet quis massa. Integer in erat id diam vestibulum vulputate. ',
          'Ut vel ex eget dolor vestibulum volutpat. Maecenas tincidunt luctus eros, ut accumsan enim congue at.',
          'Cras lobortis elit urna, eu vehicula sapien cursus eget. Nullam mollis, justo a consequat condimentum, mi velit facilisis metus, finibus luctus erat mi quis dolor.',
        ]
      },
      {
        title: 'Título h4',
        titleSize: 'h4',
        paragraphs: [
          'Vestibulum varius at justo eget consequat. Nunc at nibh odio. Suspendisse potenti. Donec pulvinar convallis odio, id commodo magna lobortis nec. Maecenas sed ex nec felis elementum lacinia a sagittis felis. Proin sit amet diam at arcu tristique faucibus. Phasellus viverra scelerisque tortor eget vestibulum. Donec id tortor id metus malesuada venenatis. Nulla sit amet imperdiet ligula, eu malesuada ex. Integer in ipsum molestie, tincidunt erat quis, maximus ipsum. Fusce ante ante, feugiat eget faucibus sed, euismod sit amet urna. Curabitur et sodales ante, eu vehicula dolor.',
        ],
      },
    ]
  },
  plansPage: {
    title: 'Diário do Clima PRO',
    subtitle: 'Acesse todos os benefícios e nos ajude a crescer',
    startTest: 'Iniciar teste grátis',
    testCost: 'Teste sem custos por 7 dias • Depois, R$00,00/mês',
    testWarn: 'Enviaremos um lembrete 2 dias antes do período de teste terminar e você pode cancelar a qualquer momento',
    cardsTitle: 'Assinatura',
    cardsSubTitle: 'Tenha nas mãos todas as informações que você precisa sobre políticas ambientais.',
    basic: 'Básico',
    basicDesc: 'Para pessoas ou organizações que estão apenas começando a explorar sobre as políticas ambientais',
    basicPrice: 'Grátis',
    state: 'Você já está utilizando esta versão.',
    startSearch: 'Começar a buscar',
    basicItem1: 'Busca por palavra-chave ou CNPJ',
    basicItem2: 'Busca avançada e/ou',
    basicItem3: 'Filtro por município',
    basicItem4: 'Visualização de resultados publicados nos últimos 3 meses',
    pro: 'PRO',
    proDesc: 'Para organizações que precisam das informações mais quentes sobre políticas ambientais',
    proPrice: 'R$0,00',
    perMonth: '/mês',
    startTestLink: 'Começar teste grátis',
    signUp: 'ou assinar agora',
    proItem1: <span>Visualização de resultados de <span className='underline'>todo o histórico disponível</span> no banco de dados</span>,
    proItem2: 'Filtro de busca por temas inteligentes',
    proItem3: 'Criação de alertas com filtros e palavras-chaves personalizadas',
    preOrder: 'Encomende seu relatório',
    preOrderDesc: 'Para organização que precisam de conteúdo centralizado e curado por especialistas sobre um determinado assunto',
    contact: 'Contactar vendas',
    simulate: 'Simular custo',
    discount: '50% para organizações que não visam lucro',
    discountDesc: 'Seu impacto é importante. O Diário do Clima apoia pessoas e organizações independentes que desejam utilizar nosso conteúdo para transformar a sociedade. Para se inscrever na lista de espera, preencha o formulário.',
    getDiscount: 'Solicitar desconto',
    faq: 'Perguntas frequentes',
    faqItems: [
      {
        title:'Como funciona a assinatura profissional do Diário do Clima?',
        text: 'A assinatura profissional do Diário do Clima atenderá  pessoas ou organizações que estão começando a explorar sobre as políticas ambientais.'
      },
      {
        title:'Quais formas de pagamento vocês aceitam?',
        text: <div>
          <p>Você será enviado para um ambiente seguro do nosso parceiro Pagseguro, plataforma segura de pagamentos on-line.</p>
          <p>Ali, você terá as opções de pagamento via boleto bancário (somente à vista) ou cartão de crédito (à vista ou parcelado).</p>
        </div>
      },
      {
        title:'Quão seguro é o Diário do Clima?',
        text: 'O Diário do Clima se responsabiliza pela adoção e manutenção de medidas razoáveis de segurança, técnicas e administrativas que visam à proteção dos dados pessoais contra situações acidentais ou ilícitas de destruição, perda, alteração, comunicação ou qualquer forma de tratamento inadequado ou ilícito, bem como processamento discriminatório de informações, conforme critérios definidos pelos melhores padrões de mercado e em legislação aplicável.'
      },
      {
        title:'Como eu cancelo minha assinatura do Diário do Clima?',
        text: <div>
          <p>É importante de início informarmos que o procedimento de cancelamento deve ser realizado pelo assinante. O mesmo pode ser realizado de forma simples e segura, através das configurações de seu perfil.</p>

          <p>
            <li>1. Realize o <a style={{color: '#52ce5f'}} href='/?login=open'>login</a> em seu perfil assinante;</li>
      
            <li>2. Acesse as configurações de seu perfil xxxxxxxxxxx</li>
      
            <li>3. Em seguida clique em Assinaturas e em Cancelar Assinatura.</li>
          </p>
        </div>
      },
    ]
  },
  purchasePage: {
    title: 'Comece seu período de 7 dias de teste.',
    subTitle: 'Usufrua dos benefícios de ser PRO sem compromisso. Cancele a qualquer momento.',
    detailsTitle: 'Detalhes da assinatura',
    perMonth: '/mês*',
    getPlanError: 'Ocorreu um erro ao receber o plano pro, por favor, recarregue a página. Caso o erro persista, entre em contato conosco.',
    detailAlert: '* cobrado mensalmente após o período de 15 dias testes',
    purchaseTerms: <span>
      Ao clicar em assinar você está concordando com nossos
      <a href={urls.terms.url} className='hover-animation blue-link'> termos de assinantes. </a>
      Sua assinatura será <b>renovada automaticamente</b> todo mês ao realizar a cobrança no seu cartão 
      de crédito cadastrado até que você realize o cancelamento. <br/>
      Você pode cancelar a qualquer momento antes do próximo ciclo de pagamento.
    </span>,
    submitLabel: 'Assinar',
    errors: {
      errorPartA: 'Ocorreu um erro ao tentar',
      errorPartB: 'Por favor, verifique se os dados foram inseridos corretamente e tente novamente.',
      onPayment: 'realizar o pagamento',
      onCard: 'cadastrar seu cartão',
      onAddress: 'cadastrar o endereço',
      onPhone: 'cadastrar o telefone',
      onPlan: 'cadastrar seu novo plano'
    },
    formTitle: 'Detalhes do pagamento',
    labels: {
      card: 'Número do cartão de crédito',
      name: 'Nome impresso no cartão',
      validity: 'Data de validade',
      cvv: 'CVV',
      address: 'Endereço',
      number: 'Número',
      district: 'Bairro',
      complement: 'Complemento (opcional)',
      city: 'Cidade',
      state: 'Estado',
      cep: 'CEP',
      cpf: 'CPF',
      birthday: 'Data de nascimento',
      phone: 'Telefone',
    }
  },
  registration: {
    usedEmail: 'Este endereço de e-mail ja possui uma conta cadastrada',
    error: {
      errorMessage: 'Ocorreu um erro ao tentar criar a sua conta, por favor, tente novamente.',
      reason: 'Motivo do erro:',
      tryAgain: 'Clique aqui para voltar ao inicio do cadastro',
    },
    titlePageA: 'Crie uma conta para começar a buscar no Diário do Clima',
    titlePageB: 'Bem-vindo ao Diário do Clima',
    subtitle: 'Queremos te conhecer um pouco melhor! Complete seu cadastro',
    agree: 'Ao se cadastrar, você está aceitando os nossos',
    terms: 'Termos e condições',
    contact: 'Fale conosco',
    haveAccount: 'Já possui uma conta?',
    login: 'Faça o login',
    labels: {
      name: 'Nome Completo',
      email: 'E-mail',
      gender: 'Gênero',
      area: 'Area de Atuação',
      state: 'Estado',
      city: 'Cidade',
      lastSubmit: 'Finalizar'
    },
  },
  reportsPage: {
    simulation: {
      title: 'Simular o valor do relatório',
      subTitle: 'Você pode encomendar um relatório personalizado. Preencha o formulário abaixo para receber uma cotação.',
      value: 'Valor estimado',
    },
    error: 'Ocorreu um erro ao carregar os relatórios públicos.',
    reloadPage: 'Recarregar página',
    title: 'Relatórios de análises aprofundadas do Diário do Clima',
    subtitle: 'Informações qualificadas, baseadas nos diários oficiais e curadas por profissionais. Mais resultados e insights do que a interface do Diário do Clima oferece.',
    simulateButton: 'Simular o custo',
    professionals: 'Para profissionais de pesquisa e consultores',
    professionalsDesc: 'Obtenha uma visão geral e abrangente sobre um tema',
    organizations: 'Para organizações',
    organizationsDesc: 'Obtenha dados e insights para tomar melhores decisões',
    reportTitle: 'Nome do relatório de exemplo',
    report1Desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel accumsan massa, vitae bibendum turpis. Phasellus venenatis nunc in nisl lacinia, sed consequat nunc lobortis. Ut pellentesque, ligula fermentum imperdiet posuere, magna lorem sodales massa, ac posuere tortor magna vel quam. Nunc eu feugiat tellus, et luctus magna. Proin sodales tempus ultricies. Fusce tristique metus vitae enim egestas, fringilla imperdiet nulla ultrices. Nullam sed lacus ac erat ultricies hendrerit. Nulla sit amet sem dolor. Donec eros est, sagittis non metus ut, tempus facilisis sem.',
    report2Desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel accumsan massa, vitae bibendum turpis. Phasellus venenatis nunc in nisl lacinia, sed consequat nunc lobortis. Ut pellentesque, ligula fermentum imperdiet posuere, magna lorem sodales massa, ac posuere tortor magna vel quam. Nunc eu feugiat tellus, et luctus magna. Proin sodales tempus ultricies. Fusce tristique metus vitae enim egestas, fringilla imperdiet nulla ultrices. Nullam sed lacus ac erat ultricies hendrerit. Nulla sit amet sem dolor. Donec eros est, sagittis non metus ut, tempus facilisis sem.',
    reportButton: 'Ver relatório',
    doubts: 'Dúvidas?',
    knowMore: 'Quer saber mais sobre os dados em seu relatório? ',
    contact: 'Entre em contato',
    contactDesc: 'para receber dicas para melhor interpretar e compreender as suas principais descobertas. Nossos especialistas estão prontos para ajudá-lo com insights profundos para melhor apresentar e revelar as conclusões de seu relatório personalizado.'
  },
  forgotPassword: {
    title: 'Esqueceu a senha?',
    text: 'Preencha o email e nós enviaremos um link para redefinir sua senha caso o e-mail informado exista em nossa base de dados.',
    button: 'Enviar',
    emailInvalid: 'O e-mail inserido é inválido',
    emailLabel: 'E-mail',
    sentTitle: 'Email enviado com sucesso.',
    sentText: 'Acesso o link em seu email. Verifique sua caixa de entrada e também a caixa de spam.',
    apiError: 'Ocorreu um erro ao tentar enviar a mensagem, por favor, tente novamente.',
    notFound: 'Não encontramos seu email cadastrado em nosso site. Verifique se digitou corretamente, por favor.',
  },
  defineNewPassword: {
    title: 'Redefinir senha',
    text: 'Digite uma nova senha',
    button: 'Redefinir',
    inputLabel: 'Nova senha',
    error: 'A senha deve atender todos os requisitos',
    apiError: 'Ocorreu um erro ao tentar redefinir a senha, por favor, tente novamente',
    sentTitle: 'A senha foi redefinida com sucesso!',
    sentButton: 'Entrar',
    expired: 'O link expirou, por favor, tente novamente.'
  },
  searchPage: {
    advancedSearchTitle: <span>Para usar um desses caracteres literalmente, escape-o com uma barra invertida (\).</span>,
    advancedSearch: [
      {
        title: '+ significa operação E',
        desc: 'Utilize + quando os resultados devem conter ambos os termos',
        ex: 'crédito + cartão',
      },
      {
        title: '| significa operação OU',
        desc: 'Utilize | quando os resultados devem conter pelo menos um dos termos',
        ex: 'débito | crédito',
      },
      {
        title: '- nega um único token',
        desc: 'Explicação de quando utilizar',
        ex: '',
      },
      {
        title: '" envolve um número de tokens para significar uma frase para pesquisa',
        desc: 'Explicação de quando utilizar',
        ex: '',
      },
      {
        title: '* no final de um termo significa uma consulta de prefixo',
        desc: '',
        ex: '',
      },
      {
        title: '~N depois de uma palavra significa editar a distância (indefinição)',
        desc: '',
        ex: '',
      },
      {
        title: '~N depois de uma frase significa quantidade de despejo',
        desc: '',
        ex: '',
      },
      {
        title: '* no final de um termo significa uma consulta de prefixo',
        desc: '',
        ex: '',
      },
    ],
    searchfield: {
      label: 'Encontre um ato ambiental',
      title: 'Palavras-chave',
      advanced: 'Busca avançada',
      filter: 'Filtrar',
      createAlert: 'Criar alerta',
    },
    list: {
      results: 'resultados encontrados',
      createAlert: 'Criar alerta',
      orderSelect: 'Ordenar por',
      initialText: 'Busque por palavras-chave ou utilize os filtros para encontrar resultados',
      emptyResult: 'Nenhum resultado foi encontrado para sua busca.',
    },
    item: {
      download: 'Baixar diário oficial'
    },
    filters: {
      title: 'Filtros',
      clean: 'Limpar tudo',
      period: 'Período de tempo',
      tab1: 'Recentes',
      tab2: 'Intervalo de tempo',
      from: 'De',
      to: 'Até',
      entityTitle: 'Entes do governo',
      entityLabel: 'Selecione um ente',
      locationTitle: 'Município',
      locationLabel: 'Comece a digitar para encontrar a cidade que procura',
      themeTitle: 'Tema',
      themeSubtitle: 'Aqui uma descrição breve do que são e de como funcionam os temas'
    }
  },
  partners: [
    {
      logo: LOGOProjetoColabora,
      link: 'https://projetocolabora.com.br/',
    },
    {
      logo: LOGOinfoamazonia,
      link: 'https://infoamazonia.org/',
    },
    {
      logo: LOGOoeco,
      link: 'https://oeco.org.br/',
    },
  ]
}; 