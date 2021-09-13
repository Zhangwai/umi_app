import { history } from 'umi'
import ProLayout from '@ant-design/pro-layout';
import logo from '../../../public/laotou.svg'
import Footer from '../Footer';
import RightContent from '../RightContent'





const AccountLayout = (props: any) => {
    return (
        <div
            id="test-pro-layout"
            style={{
                height: '100vh',
            }}
        >
            <ProLayout
                title={"你大头NO.1"}
                logo={logo}
                fixedHeader={true}
                layout={"mix"}
                collapsedButtonRender={() => null}
                menuRender={false}
                rightContentRender={() => <RightContent />}
                footerRender={() => <Footer />}
                waterMarkProps={{
                    content: '大头集团',
                }}
                onMenuHeaderClick={() => history.push('/')}
            >
                {props.children}
            </ProLayout>
        </div>

    );
}

export default AccountLayout;
